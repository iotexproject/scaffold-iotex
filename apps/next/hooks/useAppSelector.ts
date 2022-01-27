import { TypedUseSelectorHook, useSelector } from 'react-redux'

import type { AppState } from '../store'

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector