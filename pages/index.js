import { useRouter } from "next/router";
import LocaleSwitcher from "../components/locale-switcher";
import locales from "../locales";
import Form from "../components/form";

export default function IndexPage({ data }) {
  const router = useRouter();
  const { locale: activeLocale, defaultLocale } = router;
  const t = activeLocale ? locales[activeLocale] : locales[defaultLocale];

  return (
    <div className={activeLocale === "ar" ? "lang-ar" : ""}>
      <LocaleSwitcher />
      <br />
      <div class="main-form">
        <div className="inner-main">
          <h1>{t.form}</h1>
          <Form schema={data} />
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async ({ locale, locales }) => {
  const data = await fetch("https://hello-world-two-roan.vercel.app/api").then(
    (res) => res.json()
  );
  console.log(data);
  return {
    props: {
      data: data,
    },
  };
};
