import React from 'react'; 
// uncomment below to engage why did you render
// import '../lib/wdyr.ts'
import '../styles/globals.css';

import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { IntlError, NextIntlClientProvider } from 'next-intl';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      {/* @ts-ignore - UPGRADE */}
          <NextIntlClientProvider
            messages={pageProps.messages || {}}
            onError={(_: IntlError) => null}
            locale={router.locale || 'en'}
          >
            {/* @ts-ignore */}
            <Component {...pageProps} />
          </NextIntlClientProvider>
    </>
  );
}

export default MyApp;
