import { useTranslations } from "next-intl";
import React from "react";

const Report = () => {
    const t = useTranslations();
    return <div>
         <h1>Report 2</h1>
        {t("two")}
    </div>
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
  

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    };
};

export default Report;
