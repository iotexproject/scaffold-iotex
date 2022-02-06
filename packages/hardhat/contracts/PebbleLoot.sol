// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./utils/Base64.sol";

/// @title Pebble Tracker Loot NFT
/// A contract for creating Pebble Tracker Loot NFTs
/// Generates uri for each Pebble Tracker that live on chain
contract PebbleLoot is ERC721, Ownable {
    /// @dev function toString() is used to convert uint256 to string
    using Strings for uint256;

    //////////////
    /// Events ///
    //////////////

    /// Emitted when token 'imei' was minted by 'minter'
    event TokenMinted(
        address indexed minter,
        uint256 indexed imei
    );

    //////////////
    /// Errors ///
    //////////////

    /// IMEI digit count should be in range [10,20]
    error ImeiOutOfRange();

    /// @notice skin - an animal representation of a pebble device
    /// @dev randomly assigned for each imei
    string[12] internal skins = [
        unicode"Cat 😼",
        unicode"Dog 🐶",
        unicode"Panda 🐼",
        unicode"Grizzly 🐻",
        unicode"PolarBear 🐻‍❄️",
        unicode"Wolf 🐺",
        unicode"Fox 🦊",
        unicode"Unicorn 🦄",
        unicode"Ape 🐵",
        unicode"Shark 🦈",
        unicode"Frog 🐸",
        unicode"Whale 🐳"
    ];

    /// @notice extra features, extend skins
    /// @dev assigned randomly for each imei
    string[5] internal features = [
        'smart',
        'rekt',
        'rich',
        'chilled',
        'golden'
    ];

    constructor() ERC721("PebbleLoot", "PLT") {}

    /// @notice Additional check to validate imei
    /// @param _imei IMEI of a pebble device, number, should be in range [10,20]
    modifier imeiInRange(uint256 _imei) {
        if (_imei < (10**10) || _imei > (10**20 - 1)) revert ImeiOutOfRange();
        _;
    }

    ///////////////////////////
    /// External and public ///
    ///////////////////////////

    /// @notice method for minting pebble loot nft
    /// @notice anyone can mint, even if not owning device
    /// @param _imei IMEI of a pebble device
    function safeMint(
        uint256 _imei
    ) external imeiInRange(_imei) {
        _safeMint(_msgSender(), _imei);
        emit TokenMinted(_msgSender(), _imei);
    }

    /// @notice getter of randomly generated skin for a specific imei
    /// @param _imei IMEI of a pebble device
    /// @return stringified generated skin with additional features
    function getSkin(uint256 _imei) public view returns (string memory) {
        uint256 rand = random(string(abi.encodePacked('SKIN', _imei.toString())));
        string memory output = skins[rand % skins.length];
        string memory feature = features[rand % features.length];
        output = string(abi.encodePacked(feature, ' robo', output));
        return output;
    }

    /// @notice Generator of token URI
    /// @param _imei IMEI of a pebble device
    /// @return stringified base64 encoded uri
    function tokenURI(uint256 _imei) public view override returns (string memory) {
        string memory imeiString = _imei.toString();

        // construct img representation of the loot
        string memory output = string(
            abi.encodePacked(
                        '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">'
                        '<style>.base { fill: white; font-family: serif; font-size: 22px; }</style>'
                        '<rect width="100%" height="100%" fill="black" />'
                        '<text x="10" y="30" class="base">',
                        unicode"pebble soul 👻 #",
                        imeiString,
                        '</text><text x="10" y="60" class="base">skin: ',
                        getSkin(_imei),
                        '</text></svg>'
                    )
        );

        // name for uri string
        string memory name = string(abi.encodePacked('"name": "Pebble Loot #', imeiString, '"'));

        // description for uri string
        string memory description = '"description": "Pebble Loot is a '
                                    'representation of real world pebble device. '
                                    'Stats, images, and other functionality '
                                    'are intentionally omitted for others '
                                    'to interpret. Feel free to use Pebble '
                                    'Loot in any way you want."';

        // base64 encoded uri body
        string memory json = Base64.encode(
            bytes(
                string(abi.encodePacked(
                    '{',
                    name,
                    ',',
                    description,
                    ',"image": "data:image/svg+xml;base64,',
                    Base64.encode(bytes(output)),
                    '"}'
                ))
            )
        );

        output = string(abi.encodePacked('data:application/json;base64,', json));
        return output;
    }

    ////////////////////////////
    /// Internal and private ///
    ////////////////////////////

    /// @param _input a string to generate a random number for
    /// @return a number derived from a hashed string
    function random(string memory _input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(_input)));
    }
}
