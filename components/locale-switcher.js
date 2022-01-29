import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import locales from "../locales";

export default function LocaleSwitcher() {
  const router = useRouter();
  const { locales: options, locale: activeLocale, defaultLocale } = router;
  const t = activeLocale ? locales[activeLocale] : locales[defaultLocale];

  return (
    <div className="lang-drop">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{t.language}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Language"
          value={activeLocale}
        >
          {options.map((locale) => {
            const { pathname, query, asPath } = router;
            return (
              <MenuItem value={locale}>
                <Link href={{ pathname, query }} as={asPath} locale={locale}>
                  {locales[locale].langName}
                </Link>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}

{
  /* <div class="dropdown">
<button
  class="btn btn-secondary dropdown-toggle"
  type="button"
  id="dropdownMenuButton"
  data-toggle="dropdown"
  aria-haspopup="true"
  aria-expanded="false"
>
  Dropdown button
</button>
<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
  {options.map((locale) => {
    const { pathname, query, asPath } = router;
    return (
      <Link href={{ pathname, query }} as={asPath} locale={locale}>
        <li
          key={locale}
          style={{ color: locale === activeLocale ? "red" : "blue" }}
          class="dropdown-item"
        >
          {locales[locale].langName}
        </li>
      </Link>
    );
  })}
  <a class="dropdown-item" href="#">
    Action
  </a>
  <a class="dropdown-item" href="#">
    Another action
  </a>
  <a class="dropdown-item" href="#">
    Something else here
  </a>
</div>
</div> */
}
