import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-w-screen max-w-screen flex max-h-screen min-h-screen justify-center text-center">
      <div className="px-10 py-14">
        <h1 className="py-10 text-[50px] font-bold">404</h1>
        <p className="py-10 text-2xl">{t("404_page")}</p>
        <Link
          to={"/"}
          className="inline-block text-xl font-bold text-sky-700 underline"
        >
          {t("go_back")}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
