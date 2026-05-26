export default function PrivacyPage() {
  return (
    <article className='mx-auto w-full max-w-5xl px-32 py-64 text-[17px] text-gray-800'>
      <header className='mb-56 border-b border-gray-200 pb-40'>
        <h1 className='text-4xl font-bold text-gray-900'>
          INFLACE 개인정보처리방침
        </h1>
        <p className='mt-16 text-base text-gray-500'>시행일: 2026년 6월 1일</p>
      </header>

      <p className='mb-56 leading-32 text-gray-700'>
        인플레이스(이하 &ldquo;회사&rdquo; 또는 &ldquo;우리&rdquo;)는
        개인정보 보호법에 따라 이용자의 개인정보를 보호하고, 이와 관련한 고충을
        신속하고 원활하게 처리하기 위하여 다음과 같이 개인정보처리방침을
        수립합니다.
      </p>

      <Section title='1조. 개인정보의 처리 목적'>
        <p className='mb-16 leading-32 text-gray-700'>
          회사는 다음의 목적으로 개인정보를 처리합니다.
        </p>
        <ol className='list-decimal space-y-8 pl-24 leading-32 text-gray-700'>
          <li>
            <strong>회원가입 및 관리</strong>: 서비스 이용을 위한 회원 신원 확인,
            불량 회원 및 부정 이용 방지
          </li>
          <li>
            <strong>서비스 제공</strong>: INFLACE 서비스(인플루언서 분석, 채널
            성과 데이터, 콘텐츠 제공 등) 제공 및 운영
          </li>
          <li>
            <strong>결제 처리</strong>: 유료 구독 서비스 이용요금 청구 및 정산
          </li>
          <li>
            <strong>고객 지원</strong>: 문의 처리, 불만 접수 및 혜택 제공
          </li>
          <li>
            <strong>마케팅 활용</strong>: 서비스 관련 안내, 신규 기능 안내,
            이벤트 등 정보성 광고 발송 (수신 동의시에 한함)
          </li>
          <li>
            <strong>서비스 개선 및 새로운 서비스 개발</strong>: 서비스 이용 통계
            분석 및 신규 기능 연구
          </li>
        </ol>
      </Section>

      <Section title='2조. 처리하는 개인정보의 항목'>
        <h3 className='mb-12 mt-24 text-lg font-semibold text-gray-900'>
          필수 수집 항목
        </h3>
        <Table
          headers={['항목', '수집 목적', '보유 기간']}
          rows={[
            ['이메일 주소', '회원식별, 서비스 안내', '회원 탈퇴 후 1년'],
            ['비밀번호 (암호화 저장)', '본인 인증', '회원 탈퇴 후 즉시 파기'],
            ['서비스 이용 기록', '불법 이용 확인, 서비스 개선', '3년'],
          ]}
        />

        <h3 className='mb-12 mt-32 text-lg font-semibold text-gray-900'>
          결제 시 추가 수집 항목
        </h3>
        <Table
          headers={['항목', '수집 목적', '보유 기간']}
          rows={[
            [
              '결제 수단 (카드사, 마지막 4자리)',
              '결제 식별 및 부정 결제 방지',
              '탈퇴 후 5년',
            ],
            ['결제 내역', '요금 청구 및 환불 처리', '탈퇴 후 5년'],
            ['결제 정보 (VAT 발행 시)', '부가세법 준수', '5년'],
          ]}
        />

        <h3 className='mb-12 mt-32 text-lg font-semibold text-gray-900'>
          자동 수집 항목 (서비스 이용 시)
        </h3>
        <ul className='list-disc space-y-8 pl-24 leading-32 text-gray-700'>
          <li>IP 주소: 부정 접속 탐지, 서비스 보안</li>
          <li>접속 로그: 서비스 개선 및 부정 이용 탐지</li>
          <li>기기 정보: 서비스 회원 활동 분석</li>
        </ul>
      </Section>

      <Section title='3조. 개인정보의 제3자 제공'>
        <p className='mb-16 leading-32 text-gray-700'>
          회사는 이용자의 개인정보를 원칙적으로 외부에 제공, 공유 또는 제3자가
          이용하도록 하지 않습니다. 다만, 다음의 경우에는 필요한 범위 내에서
          제공합니다.
        </p>
        <Table
          headers={['제공 대상', '제공 항목', '제공 목적']}
          rows={[
            ['토스페이먼츠', '결제 정보', '결제 처리 및 정산'],
            ['클라우드 인프라 제공업체', '서버 접속 로그', '서비스 시스템 운영'],
            ['이메일 발송 서비스', '이메일 주소', '서비스 안내 발송'],
          ]}
        />
        <Callout variant='warning' className='mt-24'>
          <p className='mb-8 font-medium'>
            다음의 경우는 반드시 이용자에게 사전 동의를 받습니다.
          </p>
          <ul className='list-disc space-y-4 pl-20'>
            <li>이용자가 사전에 동의한 경우</li>
            <li>법령에 특별한 규정이 있는 경우</li>
          </ul>
        </Callout>
      </Section>

      <Section title='4조. 개인정보의 처리 위탁'>
        <p className='mb-16 leading-32 text-gray-700'>
          회사는 서비스 운영을 위해 다음과 같이 개인정보 처리 업무를 위탁합니다.
        </p>
        <Table
          headers={['수탁업체', '위탁 업무']}
          rows={[
            ['클라우드 서비스 제공업체', '서버 호스팅 및 데이터 저장'],
            ['결제 대행업체', '결제 정보 수집 및 청구'],
            ['이메일 서비스 업체', '안내 메일 발송, 수신 오류 발송'],
          ]}
        />
        <p className='mt-16 leading-32 text-gray-700'>
          회사는 수탁업체가 개인정보를 안전하게 처리하도록 관리감독하며, 수탁
          범위 외의 개인정보를 취급하지 않도록 계약을 체결합니다.
        </p>
      </Section>

      <Section title='5조. 정보주체의 권리'>
        <p className='mb-16 leading-32 text-gray-700'>
          이용자(정보주체)는 다음과 같은 권리를 언제든지 행사할 수 있습니다.
        </p>
        <ol className='list-decimal space-y-8 pl-24 leading-32 text-gray-700'>
          <li>
            <strong>개인정보 열람 요구권</strong>: 처리하는 개인정보의 확인을
            요청할 수 있다.
          </li>
          <li>
            <strong>개인정보 정정 요구권</strong>: 부정확하거나 불완전한 정보에
            대해 정정을 요청할 수 있다.
          </li>
          <li>
            <strong>개인정보 삭제 요구권</strong>: 개인정보의 삭제를 요청할 수
            있다.
          </li>
          <li>
            <strong>처리 정지 요구권</strong>: 개인정보 처리의 정지를 요청할 수
            있다.
          </li>
          <li>
            <strong>개인정보 이동성 요구권</strong>: 처리하는 개인정보를
            체계적으로 통용되는 형식으로 이동할 것을 요청할 수 있다.
          </li>
        </ol>
        <p className='mt-16 leading-32 text-gray-700'>
          요청은 열람 참구인, 정정, 삭제 등 요청일로부터{' '}
          <strong>10일 이내</strong>에 처리하였음을 통지합니다.
        </p>
        <Callout variant='info' className='mt-24'>
          희망 사항에 대한 처리가 어려울 때는 개인정보보호위에 불제를 신청할 수
          있습니다.
        </Callout>
      </Section>

      <Section title='6조. 개인정보의 파기'>
        <ol className='list-decimal space-y-8 pl-24 leading-32 text-gray-700'>
          <li>
            회사는 이용자의 개인정보를 보유 기간 만료 시 지체없이 파기(복구할 수
            없는 방법으로 삭제)합니다.
          </li>
          <li>
            전자적 파일의 형태로 저장된 개인정보는 기술적 방법을 활용하여
            안전하게 삭제됩니다.
          </li>
          <li>
            다만, 법령에 따라 보존하여야 하는 경우(예: 무등이익방지법 5년,
            전자상거래법 5년)는 해당 기업과 관계 당 보유됩니다.
          </li>
        </ol>
      </Section>

      <Section title='7조. 쿠키 및 접속 로그 수집'>
        <p className='mb-16 leading-32 text-gray-700'>
          회사는 서비스 운영 및 프라이버시 보호를 위해 쿠키(Cookie)를 사용합니다.
        </p>
        <h3 className='mb-12 mt-24 text-lg font-semibold text-gray-900'>
          사용하는 쿠키 유형
        </h3>
        <Table
          headers={['유형', '대상', '목적']}
          rows={[
            ['필수 쿠키', '로그인 세션', '서비스 정상 작동에 필수'],
            ['분석 쿠키', '서비스 이용 통계', '서비스 개선 목적'],
          ]}
        />
        <p className='mt-16 leading-32 text-gray-700'>
          이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나, 이 경우
          서비스 일부 기능 이용이 제한될 수 있습니다.
        </p>
      </Section>

      <Section title='8조. 개인정보의 안전성 확보'>
        <p className='mb-16 leading-32 text-gray-700'>
          회사는 이용자의 개인정보를 안전하게 유지하기 위해 다음과 같은 안전성
          확보 조치를 취하고 있습니다.
        </p>
        <ul className='list-disc space-y-8 pl-24 leading-32 text-gray-700'>
          <li>
            <strong>암호화</strong>: 비밀번호 및 결제 정보는 암호화되어
            저장됩니다.
          </li>
          <li>
            <strong>HTTPS</strong>: 모든 데이터 전송은 SSL/TLS를 통해 암호화됩니다.
          </li>
          <li>
            <strong>접근 권한 관리</strong>: 개인정보에 대한 접근은 담당 직원에만
            부여합니다.
          </li>
          <li>
            <strong>PCI-DSS 준수</strong>: 결제 정보는 토스페이먼츠를 통해
            처리되며 회사 서버에 카드 정보를 저장하지 않습니다.
          </li>
          <li>
            <strong>정기적 보안 점검</strong>: 중요 개인정보 취급 시스템에 대한
            정기적 보안 평가를 실시합니다.
          </li>
        </ul>
      </Section>

      <Section title='9조. 개인정보 보호책임자'>
        <p className='mb-16 leading-32 text-gray-700'>
          회사는 개인정보 처리에 관한 업무를 열람하고 무제하기 위해 아래와 같이
          개인정보 보호책임자를 지정하고 있습니다.
        </p>
        <ul className='list-disc space-y-8 pl-24 leading-32 text-gray-700'>
          <li>
            <strong>개인정보 보호책임자</strong>: 인플레이스 대표
          </li>
          <li>
            <strong>연락처</strong>:{' '}
            <a
              href='mailto:inflaceproject@gmail.com'
              className='text-blue-600 underline underline-offset-2 hover:text-blue-700'
            >
              inflaceproject@gmail.com
            </a>
          </li>
          <li>
            <strong>홀페이지</strong>:{' '}
            <a
              href='https://inflace.site'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 underline underline-offset-2 hover:text-blue-700'
            >
              https://inflace.site
            </a>
          </li>
        </ul>
        <p className='mt-16 leading-32 text-gray-700'>
          개인정보 보호 관련 문의사항은 위 책임자에게 연락주시면 신속하게 답변
          드리겠습니다.
        </p>
      </Section>

      <Section title='10조. 개인정보처리방침의 변경'>
        <ol className='list-decimal space-y-8 pl-24 leading-32 text-gray-700'>
          <li>
            이 개인정보처리방침은 법령의 개정, 정부의 지침 또는 회사내부 방침의
            변경에 의해 내용이 추가, 삭제, 수정될 수 있습니다.
          </li>
          <li>
            개인정보처리방침이 변경되는 경우 회사는 변경 사항과 시행일을 서비스
            내 공지사항 또는 이메일을 통해 <strong>시행일 7일 전</strong>부터
            공지합니다.
          </li>
          <li>
            이용자가 변경된 방침에 동의하지 않는 경우 서비스 탈퇴를 통해 개인정보
            제공을 중단할 수 있습니다.
          </li>
        </ol>
      </Section>

      <footer className='mt-64 border-t border-gray-200 pt-40'>
        <h2 className='mb-12 text-xl font-semibold text-gray-900'>부칙</h2>
        <p className='leading-32 text-gray-700'>
          이 개인정보처리방침은 2026년 6월 1일부터 시행합니다.
        </p>
        <p className='mt-16 text-sm text-gray-500'>
          <strong>개인정보보호위 처리</strong>:{' '}
          <a
            href='http://www.privacy.go.kr'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 underline underline-offset-2 hover:text-blue-700'
          >
            www.privacy.go.kr
          </a>{' '}
          / 182 (국번 없이 연락 가능)
        </p>
      </footer>
    </article>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className='mb-56'>
      <h2 className='mb-20 text-2xl font-semibold text-gray-900'>{title}</h2>
      {children}
    </section>
  )
}

function Table({
  headers,
  rows,
}: {
  headers: string[]
  rows: string[][]
}) {
  return (
    <div className='overflow-x-auto'>
      <table className='w-full border-collapse text-base'>
        <thead>
          <tr className='border-b border-gray-300 bg-gray-50'>
            {headers.map((header) => (
              <th
                key={header}
                className='border border-gray-200 px-16 py-12 text-left font-semibold text-gray-900'
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className='border-b border-gray-200'>
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className='border border-gray-200 px-16 py-12 leading-24 text-gray-700'
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Callout({
  variant,
  className,
  children,
}: {
  variant: 'info' | 'warning'
  className?: string
  children: React.ReactNode
}) {
  const styles = {
    info: 'border-l-blue-400 bg-blue-50 text-gray-700',
    warning: 'border-l-amber-400 bg-amber-50 text-gray-800',
  }
  const icon = variant === 'warning' ? '⚠️' : 'ℹ️'
  return (
    <div
      className={`rounded-md border-l-4 px-16 py-12 leading-28 ${styles[variant]} ${className ?? ''}`}
    >
      <span className='mr-8'>{icon}</span>
      {children}
    </div>
  )
}
