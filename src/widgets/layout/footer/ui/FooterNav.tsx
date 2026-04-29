import { FOOTER_NAV_ITEMS } from '../model/footerNavItems'

export const FooterNav = () => {
  return (
    <div className='flex gap-2xl py-sm'>
      {FOOTER_NAV_ITEMS.map((group) => (
        <div key={group.group}>
          <div className='leading-(--leading-label-md) font-(--text-label-md) font-normal text-(--color-text-and-icon-tertiary)'>
            {group.group}
          </div>
          <ul>
            {group.items.map((item) => (
              <li
                key={item.title}
                className='mt-sm leading-(--leading-label-md) font-medium text-(--color-text-and-icon-primary)'>
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
