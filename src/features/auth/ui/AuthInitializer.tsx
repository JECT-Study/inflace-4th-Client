'use client'

import { useAuthInit } from '../model/useAuthInit'

//레이아웃의 최상단에 위치, 화면이 새로고침 될 때마다 마운트
export function AuthInitializer() {
  useAuthInit()
  return null
}
