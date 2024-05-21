import { useTranslations } from "next-intl";
import React from "react";

const One = () => {
    const t = useTranslations();
    return (
        <div>
            <h1>Report 1</h1>
            <p>
                {t("one")}
            </p>
        </div>
    );
};

export const getStaticProps = async () => {
  return {
      props: {
          messages: {
              ...require(`../../messages/en/index.en.json`),
          },
      },
  };
};


export default One;
