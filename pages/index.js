import { useRouter } from "next/router";


import "bootstrap/dist/css/bootstrap.min.css";
import LocaleSwitcher from "../components/locale-switcher";
import locales from "../locales";
import Form from "../components/form";

export default function IndexPage({ data }) {
  const router = useRouter();
  const { locale: activeLocale, defaultLocale } = router;
  const t = activeLocale ? locales[activeLocale] : locales[defaultLocale];
  
  return (
    <div className="col-md-12 rtl">
      <LocaleSwitcher />
      <br />
      <div class="row justify-content-center">
        <div className="col-md-6">
          <h1>{t.form}</h1>
          <Form schema={data}/>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ locale, locales }) => { 
  const data = await fetch("https://hello-world-two-roan.vercel.app/api").then( 
    (res) => res.json()
  );
  console.log(data)
  return {
    props: {
      data: data,
    },
  };
};
