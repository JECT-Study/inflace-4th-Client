import { FOOTER_NAV_ITEMS } from '../model/footerNavItems'

export const FooterNav = () => {
  return (
    <div className='flex gap-2xl py-sm'>
      {FOOTER_NAV_ITEMS.map((group) => (
        <div key={group.group}>
          <div className='text-noto-label-md-thin text-text-and-icon-tertiary'>
            {group.group}
          </div>
          <ul>
            {group.items.map((item) => (
              <li
                key={item.title}
                className='mt-sm text-noto-label-md-normal text-text-and-icon-primary'>
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
