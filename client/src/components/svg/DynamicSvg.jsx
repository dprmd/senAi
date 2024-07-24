import React, { lazy, Suspense, useMemo } from "react";

const importSvgComponent = (name) => {
  return lazy(() => import(`./icons/${name}.jsx`));
};

// eslint-disable-next-line react/display-name
const DynamicSvgComponent = React.memo(({ name, ...props }) => {
  const SvgComponent = useMemo(() => importSvgComponent(name), [name]);

  return (
    <Suspense fallback={<div style={{ width: "16px", height: "16px" }}></div>}>
      <SvgComponent {...props} />
    </Suspense>
  );
});

export default DynamicSvgComponent;
