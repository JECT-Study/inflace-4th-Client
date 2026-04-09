/* SVG 파일을 React 컴포넌트로 import할 때
 * TypeScript가 타입을 인식하도록 해주는 ambient module 선언 파일
 */
declare module '*.svg?react' {
  import type { FunctionComponent, SVGProps } from 'react'
  const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>
  export default ReactComponent
}
