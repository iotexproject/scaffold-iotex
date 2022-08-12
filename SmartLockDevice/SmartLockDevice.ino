#include <Arduino.h>

#ifdef ESP32
    #include <WiFi.h>
#endif
#ifdef ESP8266
    #include <ESP8266WiFi.h>
    #include <ESP8266HTTPClient.h>
    #include <WiFiClient.h>
#endif
#ifdef __SAMD21G18A__
    #include <WiFiNINA.h>
#endif

#include <map>
#include "IoTeX-blockchain-client.h"
#include "secrets.h"
#include "abi.h"

constexpr const char ip[] = IOTEX_GATEWAY_IP;
constexpr const int port = IOTEX_GATEWAY_PORT;
constexpr const char wifiSsid[] = SECRET_WIFI_SSID;
constexpr const char wifiPass[] = SECRET_WIFI_PASS;

// Create the IoTeX client connection
Connection<Api> connection(ip, port, "");

// Enum that represents the status of the lock
enum LockStatus { LOCK_OPEN, LOCK_CLOSED };

// The address
const char contractAddress[] = SECRET_CONTRACT_ADDRESS_IO;

// The address which performs the action
const char fromAddress[] = IOTEX_ADDRESS_IO;

// The contract object
Contract contract(abiJson);

// The call data
String callData = "";
ParameterValuesDictionary params;

// The execution action
Execution execution;

void initWiFi() 
{
    #if defined(ESP32)
        WiFi.mode(WIFI_STA);
        #define LED_BUILTIN 2
    #endif
    WiFi.begin(wifiSsid, wifiPass);
    Serial.print(F("Connecting to WiFi .."));
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print('.');
        delay(1000);
    }
    Serial.println(F("Connected. IP: "));
    Serial.println(WiFi.localIP());
}

void setup()
{
    IotexHelpers.setGlobalLogLevel(IotexLogLevel::DEBUG);
    IotexHelpers.setModuleLogLevel("HTTP", IotexLogLevel::DEBUG);
    Serial.begin(115200);

    #if defined(__SAMD21G18A__)
    delay(5000);    // Delay for 5000 seconds to allow a serial connection to be established
    #endif

    // Connect to the wifi network
    initWiFi();

    // Set the lock pin to out
    pinMode(LOCK_PIN, OUTPUT);
    digitalWrite(LOCK_PIN, LOW);

    contract.generateCallData("isOpen", params, callData);
    
    // Print the info
    Serial.print("Calling isOpen on contract ");
    Serial.print(contractAddress);
    Serial.print("with data: 0x");
    Serial.println(callData);

    // Create the execution action
    execution.data = callData;
    strcpy(execution.contract, contractAddress);
}

void loop()
{
    // Read the contract
    ReadContractResponse response;
    ResultCode result = connection.api.wallets.readContract(execution, fromAddress, 200000, &response);
    Serial.print("Result : ");
    Serial.println(IotexHelpers.GetResultString(result));
    Serial.print("Return data: ");
    Serial.println(response.data);

    // Decode the data
    Serial.println("Decoding the data...");
    bool isOpen = decodeBool(response.data.c_str());
    if (result != ResultCode::SUCCESS)
    {
        Serial.println("Failed to decode data");
    }
    else
    {
        String status = isOpen == true ? "OPEN" : "CLOSED";
        Serial.println("Status read from blockchain is: " + status);
        Serial.println("--------------------------------------------------\r\n");
    }

    // Open or close the lock based on the value we have read from the contract
    SetLockStatus(isOpen ? LockStatus::LOCK_OPEN : LockStatus::LOCK_CLOSED);

    // Poll the status every second
    delay(1000);
}

void SetLockStatus(LockStatus status)
{
    int pinStatus = LOW;
    if (status == LockStatus::LOCK_OPEN)
    {
        pinStatus = HIGH;
    }
    digitalWrite(LOCK_PIN, pinStatus);
}
