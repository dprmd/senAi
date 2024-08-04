import DynamicSvgComponent from "@/components/svg/DynamicSvg";
import { useTranslation } from "react-i18next";
import senAiPackages from "@/../package.json";
import SettingsTop from "@/components/composable/SettingsTop";

const DependenciesPage = () => {
  const { t } = useTranslation();
  const dependencies = Object.entries(senAiPackages.dependencies);
  const devDependencies = Object.entries(senAiPackages.devDependencies);

  return (
    <>
      <main className="min-w-screen min-h-screen text-center">
        <SettingsTop title="Dependencies" urlBack="/settings/other" />

        <div className="py-6">
          <h1 className="text-xl font-bold">{t("senai_dependencies")}</h1>
          <ul className="flex items-center justify-center gap-2 py-4">
            <li className="flex items-center">
              <DynamicSvgComponent
                name="Firebase"
                className="h-5 w-5 text-[#DD2C00]"
              />
              <strong className="mx-1">Firebase</strong>
            </li>
            <li className="flex items-center">
              <DynamicSvgComponent
                name="ReactJs"
                className="h-5 w-5 text-[#61DAFB]"
              />
              <strong className="mx-1">React Js</strong>
            </li>
            <li className="flex items-center">
              <DynamicSvgComponent
                name="ExpressJs"
                className="h-5 w-5 text-black dark:text-white"
              />
              <strong className="mx-1">Express Js</strong>
            </li>
            <li className="flex items-center">
              <DynamicSvgComponent
                name="Groq"
                className="h-5 w-5 text-[#FF7143]"
              />
              <strong className="mx-1">Groq</strong>
            </li>
          </ul>

          <div className="flex w-full flex-col py-3 md:flex-row">
            {/* Dependencies */}
            <div className="mt-4 flex flex-1 flex-col text-left md:mt-0">
              <h2 className="m-1 p-1 font-bold">Dependencies</h2>
              {dependencies.map((senAiPackage, i) => (
                <span key={i} className="m-1 p-1">
                  {senAiPackage}
                </span>
              ))}
            </div>

            {/* Dev Dependencies */}
            <div className="mt-4 flex flex-1 flex-col text-left md:mt-0">
              <h2 className="m-1 p-1 font-bold">Dev Dependencies</h2>
              {devDependencies.map((senAiPackage, i) => (
                <span key={i} className="m-1 p-1">
                  {senAiPackage}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center">
        <span className="inline-block py-2 text-slate-500 dark:text-slate-400">
          &copy; Adi Permadi, {t("made_with")}
        </span>
      </footer>
    </>
  );
};

export default DependenciesPage;
