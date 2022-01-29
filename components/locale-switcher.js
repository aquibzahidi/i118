import Link from 'next/link'
import { useRouter } from 'next/router'
import locales from '../locales'

export default function LocaleSwitcher() {
  const router = useRouter()
  const { locales: options , locale: activeLocale } = router

  return (
    <div>
      <p>Locale switcher:</p>
      <ul>
        {options.map((locale) => {
          const { pathname, query, asPath } = router
          return (
            <li key={locale} style={{color: locale===activeLocale?"red":"blue"}}>
              <Link href={{ pathname, query }} as={asPath} locale={locale}>
                <a>{locales[locale].langName}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
