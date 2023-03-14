import React from "react";
import i18next from "i18next";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import getRoute from "../../routing/routingService";
import Header from "../../head/header";
import Footer from "../../foot/footer";

import "./privacyPolicyPage.scss";

import Button from "../../ui/button/button";

const TermsPage = () => {
    //return <Redirect to={getRoute('main')}/>
    return (
        <>
            <Helmet>
                <title>{i18next.t("TERMS_PAGE_TITLE")}</title>
                <meta
                    name="description"
                    content={i18next.t("TERMS_PAGE_DESC")}
                />
                <link
                    rel="canonical"
                    href={
                        window.location.href.includes("?")
                            ? window.location.href.split("?")[0]
                            : window.location.href
                    }
                />
                <link
                    rel="alternate"
                    hrefLang={"pl"}
                    href={`${process.env.PUBLIC_URL}`}
                />
            </Helmet>
            <Header />
            <div className="container subPage termsPage">
                <div className="textCenter">
                    <h1>POLITYKA PRYWATNOŚCi SERWISU KRYPTOWALUTY.PL</h1>
                </div>
                <div className="textCenter">
                    <h3 className="themecolor biglabel">§ 1 INFORMACJE OGÓLNE</h3>
                </div>
                <ul>
                    <li>
                        Administratorem danych osobowych zbieranych za
                        pośrednictwem Serwisu jest PARTNERIA spółka z
                        ograniczoną odpowiedzialnością z siedzibą w Krakowie,
                        ul. Lekarska 1, 31-203 Kraków, posiadająca numer REGON:
                        384160447, NIP: 9452229846, wpisana do Rejestru
                        Przedsiębiorców Krajowego Rejestru Sądowego prowadzonego
                        przez Sąd Rejonowy dla Krakowa – Śródmieścia w Krakowie,
                        XI Wydział Gospodarczy Krajowego Rejestru Sądowego pod
                        numerem 0000800221.
                    </li>
                    <li>
                        Dane osobowe zbierane przez Administratora za
                        pośrednictwem strony internetowej są przetwarzane
                        zgodnie z Rozporządzeniem Parlamentu Europejskiego
                        i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r.
                        w sprawie ochrony osób fizycznych w związku
                        z przetwarzaniem danych osobowych i w sprawie swobodnego
                        przepływu takich danych oraz uchylenia dyrektywy
                        95/46/WE (ogólne rozporządzenie o ochronie danych),
                        zwanym dalej „RODO”, oraz Ustawą o ochronie danych
                        osobowych z dnia 10 maja 2018 r. (Dz.U. 2018 poz.1000).
                    </li>
                </ul>

                <div className="textCenter">
                    <h3 className="themecolor biglabel">§2 Definicje</h3>
                </div>

                <p>
                    Na potrzeby niniejszej Polityki Prywatności przyjęto
                    następującą definicje pojęć:
                </p>
                <ul>
                    <li>
                        Polityka – należy przez to rozumieć niniejszą Politykę
                        Prywatności.
                    </li>
                    <li>
                        Serwis – należy przez to rozumieć serwis internetowy
                        prowadzony przez Administratora znajdujący się pod
                        adresem: https://kryptowaluty.pl.
                    </li>
                    <li>
                        Użytkownik - należy przez to rozumieć:
                        <ul>
                            <li>
                                osobę fizyczną posiadającą pełną zdolność do
                                czynności prawnych będącą obywatelem Państwa
                                Członkowskiego Unii Europejskiej lub Państwa –
                                Strony Europejskiego Obszaru Gospodarczego albo
                                mająca tamże miejsce stałego zamieszkania, która
                                dokonała Rejestracji w Serwisie,
                            </li>
                            <li>
                                osobę prawną lub jednostką organizacyjną
                                nieposiadającą osobowości prawnej, której ustawa
                                przyznaje zdolność prawną, posiadającą siedzibę
                                w Państwie Członkowskim Unii Europejskiej lub
                                Państwie – Stronie Europejskiego Obszaru
                                Gospodarczego, która dokonała Rejestracji w
                                Serwisie.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Regulamin – należy przez to rozumieć regulamin serwisu
                        kryptowaluty.pl udostępniony w Serwisie.
                    </li>
                    <li>
                        Usługa Serwisu – należy przez to rozumieć każdą z usług
                        opisaną w §2 pkt 6-7 Regulaminu.
                    </li>
                </ul>

                <div className="textCenter">
                    <h3 className="themecolor biglabel"> § 3 RODZAJ I ZAKRES PRZETWARZANYCH DANYCH</h3>
                </div>

                <ul>
                    <li>
                        Administrator przetwarza dane osobowe Użytkowników
                        będących osobami fizycznymi oraz dane osobowe
                        wspólników, beneficjentów rzeczywistych lub osób
                        uprawnionych do reprezentacji Użytkowników będących
                        osobami prawnymi lub jednostkami organizacyjnymi
                        nieposiadającymi osobowości prawnej, którym ustawa
                        przyznaje zdolność prawna, którzy są osobami fizycznymi
                        na zasadach określonych w Polityce.
                    </li>
                    <li>
                        Administrator przetwarza dane osobowe Użytkowników oraz
                        osób wskazanych w ustępie 1 powyżej za pośrednictwem
                        Serwisu w przypadku:
                        <ul>
                            <li>
                                Założenia Konta, o którym mowa w §2 pkt 14
                                Regulaminu,
                            </li>
                            <li>
                                Rejestracji w Serwisie, o której mowa w §2 pkt 3
                                Regulaminu,
                            </li>
                            <li>
                                Zgłoszenia przez osobę odwiedzającą Serwis woli
                                uzyskania kontaktu ze strony pracowników
                                Administratora, w tym w ramach marketingu
                                bezpośredniego,
                            </li>
                            <li>Akceptacji plików cookie (ciasteczek),</li>
                        </ul>
                    </li>
                    <li>
                        Przetwarzanie danych osobowych jest związane ze
                        świadczeniem Usługi Serwisu i jest zgodne z jego
                        Regulaminem.
                    </li>
                    <li>
                        Podanie danych osobowych i umożliwienie ich
                        przetwarzania przez Administratora jest dobrowolne,
                        jednak brak przekazania wyżej wymienionych danych
                        oznacza brak możliwości korzystania ze świadczonych
                        przez Administratora Usług oraz funkcjonalności Serwisu.
                    </li>
                    <li>
                        Przetwarzane przez Administratora dane osobowe nie są
                        udostępniane osobom trzecim poza sytuacjami, w których:
                        <ul>
                            <li>
                                ma to miejsce w związku ze zgodą wyrażoną przez
                                Użytkownika,
                            </li>
                            <li>
                                wynika to z obowiązku prawnego ciążącego na
                                Administratorze,
                            </li>
                            <li>
                                jest to niezbędne do prawidłowej realizacji
                                Usługi Serwisu.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Przetwarzanie danych osobowych odbywa się na podstawie
                        RODO, w tym w szczególności:
                        <ul>
                            <li>
                                art. 6 ust. 1 lit. b RODO tj. przetwarzanie w
                                celu wykonania umowy, w zakresie danych
                                powierzonych Administratorowi w celu
                                skorzystania z Usługi świadczonej drogą
                                elektroniczną,
                            </li>
                            <li>
                                art.6 ust. 1 lit a RODO tj. na podstawie zgody
                                osoby, której dane dotyczą w zakresie danych
                                takich jak adres e-mail oraz numer telefonu,
                            </li>
                        </ul>
                    </li>
                    <li>
                        Dane powierzone przez Państwa, mogą także służyć
                        Administratorowi do wypełnienia obowiązków nakładanych
                        na niego przez prawo RP i UE w zakresie przeciwdziałaniu
                        praniu pieniędzy i finansowaniu terroryzmu zgodnie z
                        wymogami ustawy z dnia 1 marca 2018 r. o
                        przeciwdziałaniu praniu pieniędzy i finansowaniu
                        terroryzmu wdrażającej dyrektywę Parlamentu
                        Europejskiego i Rady (UE) 2015/849 z dnia 20 maja 2015
                        r. w sprawie zapobiegania wykorzystywaniu systemu
                        finansowego do prania pieniędzy lub finansowania
                        terroryzmu, zmieniającą rozporządzenie Parlamentu
                        Europejskiego i Rady (UE) nr 648/2012 i uchylającą
                        dyrektywę Parlamentu Europejskiego i Rady 2005/60/WE
                        oraz dyrektywę Komisji 2006/70/WEW, a także ciążących na
                        Administratorze obowiązków podatkowych. W takim
                        przypadku podstawą przetwarzania Państwa danych jest
                        przetwarzanie w celu wykonania ciążącego na
                        Administratorze obowiązku prawnego (art. 6 ust. 1 lit. c
                        RODO).
                    </li>
                    <li>
                        W celu realizacji Usługi Serwisu Administrator może
                        żądać od Użytkownika podania wszystkich lub części
                        danych osobowych w zakresie wskazanym poniżej i w
                        uzyskanym zakresie dane te będzie przetwarzał, w
                        odniesieniu do:
                        <ul>
                            <li>
                                Osób prawnych – imienia, nazwiska, obywatelstwa,
                                wizerunku, adresu zamieszkania, informacji o
                                rezydenturze podatkowej, kraju urodzenia,
                                informacji o zajmowanie eksponowanego stanowiska
                                politycznego, numeru telefonu, daty oraz miejsca
                                urodzenia oraz numeru PESEL osób uprawnionych do
                                reprezentacji oraz beneficjentów rzeczywistych
                                Użytkownika. W przypadku wyżej wskazanych osób
                                nieposiadających nadanego numer PESEL,
                                Administrator może żądać podania odpowiednika
                                numeru PESEL (odpowiedni krajowy numer
                                identyfikacyjny) lub innych danych
                                umożliwiających ustalenie i weryfikację
                                tożsamości Użytkownika.{" "}
                            </li>
                            <li>
                                Jednostek organizacyjnych niebędących osobami
                                prawnymi, którym ustawa przyznaje zdolność
                                prawną - imienia, nazwiska, obywatelstwa,
                                wizerunku, adresu zamieszkania, informacji o
                                rezydenturze podatkowej, kraju urodzenia,
                                informacji o zajmowanie eksponowanego stanowiska
                                politycznego, numeru telefonu, daty oraz miejsca
                                urodzenia oraz numeru PESEL osób uprawnionych do
                                reprezentacji oraz beneficjentów rzeczywistych
                                Użytkownika. W przypadku wyżej wskazanych osób
                                nieposiadających nadanego numer PESEL,
                                Administrator może żądać podania odpowiednika
                                numeru PESEL (odpowiedni krajowy numer
                                identyfikacyjny) lub innych danych
                                umożliwiających ustalenie i weryfikację
                                tożsamości Użytkownika.
                            </li>
                            <li>
                                Osób fizycznych – imienia, nazwiska,
                                obywatelstwa, wizerunku, adresu zamieszkania,
                                informacji o rezydenturze podatkowej, kraju
                                urodzenia, informacji o zajmowanie eksponowanego
                                stanowiska politycznego, numeru telefonu, daty
                                oraz miejsca urodzenia oraz numeru PESEL. W
                                przypadku osób nieposiadających nadanego numer
                                PESEL, Administrator może żądać podania
                                odpowiednika numeru PESEL (odpowiedni krajowy
                                numer identyfikacyjny) lub innych danych
                                umożliwiających ustalenie i weryfikację
                                tożsamości Użytkownika. W przypadku osób
                                fizycznych prowadzących działalność gospodarczą
                                Administrator może żądać podania NIP oraz adresu
                                prowadzenia działalności.
                            </li>
                        </ul>
                    </li>
                    <li>
                        W celu realizacji Usługi Serwisu Użytkownik jest
                        zobowiązany do dokonania weryfikacji tożsamości przy
                        wykorzystaniu wydanego na jego rzecz ważnego i
                        czytelnego urzędowego dokumentu tożsamości oraz
                        aktualnego wizerunku Użytkownika wykonywanej:
                        <ul>
                            <li>
                                za pomocą aplikacji JUMIO poprzez formularz
                                udostępniony przez Administratora w Serwisie
                                albo
                            </li>
                            <li>
                                przez upoważnionego pracownika Administratora
                                poprzez okazanie przez Użytkownika dokumentu
                                tożsamości umożliwiającego dokonanie weryfikacji
                                tożsamości.{" "}
                            </li>
                        </ul>
                    </li>
                    <li>
                        Podczas korzystania ze strony internetowej Serwisu mogą
                        być pobierane i przetwarzane dodatkowe informacje, w
                        szczególności: adres IP przypisany do komputera
                        Użytkownika lub zewnętrzny adres IP dostawcy Internetu,
                        nazwa domeny, rodzaj przeglądarki, czas dostępu, typ
                        systemu operacyjnego.
                    </li>
                    <li>
                        Od Użytkowników mogą być także gromadzone dane
                        nawigacyjne, w tym informacje o linkach i odnośnikach, w
                        które zdecydują się kliknąć lub innych czynnościach,
                        podejmowanych na stronie internetowej. Podstawą prawną
                        tego rodzaju czynności jest prawnie uzasadniony interes
                        Administratora (art. 6 ust. 1 lit. f RODO), polegający
                        na ułatwieniu korzystania z usług świadczonych drogą
                        elektroniczną oraz na poprawie funkcjonalności tych
                        usług.
                    </li>
                    <li>
                        Dane osobowe mogą być przetwarzane także w sposób
                        zautomatyzowany w formie profilowania. Konsekwencją
                        profilowania będzie przypisanie Użytkownikowi profilu w
                        celu podejmowania dotyczących jej decyzji bądź analizy
                        lub przewidywania jej preferencji, zachowań i postaw.{" "}
                    </li>
                    <li>
                        Dane osobowe Użytkowników lub osób wskazanych w ustępie
                        8 pkt a i b powyżej mogą być przetwarzane w sposób
                        zautomatyzowany przez systemy Administratora w jego
                        wewnętrznych systemach teleinformatycznych takich jak
                        bazy klientów, rejestr transakcji.
                    </li>
                    <li>
                        Administrator ustanowił Inspektora Ochrony Danych.
                        Kontakt z IOD możliwy jest pod adresem email:
                        office@partneria.pl. Administrator dokłada szczególnej
                        staranności w celu ochrony interesów osób, których dane
                        dotyczą, a w szczególności zapewnia, że zbierane przez
                        niego dane są:
                        <ul>
                            <li>przetwarzane zgodnie z prawem,</li>
                            <li>
                                zbierane dla oznaczonych, zgodnych z prawem
                                celów i niepoddawane dalszemu przetwarzaniu
                                niezgodnemu z tymi celami,
                            </li>
                            <li>
                                merytorycznie poprawne i adekwatne w stosunku do
                                celów, w jakich są przetwarzane oraz
                                przechowywane w postaci umożliwiającej
                                identyfikację osób, których dotyczą, nie dłużej
                                niż jest to niezbędne do osiągnięcia celu
                                przetwarzania.
                            </li>
                        </ul>
                    </li>
                </ul>

                <div className="textCenter">
                    <h3 className="themecolor biglabel">§ 4 PRAWA UŻYTKOWNIKA</h3>
                </div>

                <ul>
                    <li>
                        Użytkownik, którego dane dotyczą, ma prawo dostępu do
                        treści swoich danych osobowych oraz prawo ich
                        sprostowania, usunięcia, uaktualnienia, ograniczenia
                        przetwarzania, prawo do przenoszenia danych, prawo
                        wniesienia sprzeciwu, prawo do cofnięcia zgody w
                        dowolnym momencie bez wpływu na zgodność z prawem
                        przetwarzania, którego dokonano na podstawie zgody przed
                        jej cofnięciem.
                    </li>
                    <li>
                        W przypadku aktualizacji danych osobowych, Użytkownik
                        zobowiązany jest do dokonania ich również w odniesieniu
                        do danych osobowych na swoim Koncie Użytkownika.
                    </li>
                    <li>
                        Podstawy prawne żądania użytkownika:
                        <ul>
                            <li>Dostęp do danych – art. 15 RODO</li>
                            <li>Sprostowanie danych – art. 16 RODO.</li>
                            <li>
                                Usunięcie danych (tzw. prawo do bycia
                                zapomnianym) – art. 17 RODO.
                            </li>
                            <li>Ograniczenie przetwarzania – art. 18 RODO.</li>
                            <li>Przeniesienie danych – art. 20 RODO.</li>
                            <li>Sprzeciw – art. 21 RODO</li>
                            <li>Cofnięcie zgody – art. 7 ust. 3 RODO.</li>
                        </ul>
                    </li>
                    <li>
                        Cofnięcie zgody na przetwarzanie, nie wpływa na
                        legalność przetwarzania tych danych do momentu jej
                        cofnięcia, jednocześnie brak zgody na przetwarzanie
                        danych osobowych uniemożliwia dalsze świadczenie Usługi
                        Serwisu.
                    </li>
                    <li>
                        Użytkownik ma prawo w dowolnym momencie wnieść sprzeciw
                        – z przyczyn związanych z jej szczególną sytuacją –
                        wobec przetwarzania przez Administratora dotyczących jej
                        danych osobowych opartego na art. 6 ust. 1 lit. f) RODO,
                        w tym profilowania na podstawie tych przepisów. Jeżeli
                        dane osobowe są przetwarzane na potrzeby marketingu
                        bezpośredniego, osoba, której dane dotyczą, ma prawo w
                        dowolnym momencie wnieść sprzeciw wobec przetwarzania
                        dotyczących jej danych osobowych na potrzeby takiego
                        marketingu, w tym profilowania, w zakresie, w jakim
                        przetwarzanie jest związane z takim marketingiem
                        bezpośrednim.
                    </li>
                    <li>
                        W sytuacji wystąpienia przez Użytkownika z uprawnieniem
                        wynikającym z powyższych praw, Administrator spełnia
                        żądanie albo odmawia jego spełnienia niezwłocznie, nie
                        później jednak niż w ciągu miesiąca po jego otrzymaniu.
                        Jeżeli jednak - z uwagi na skomplikowany charakter
                        żądania lub liczbę żądań – Administrator nie będzie mógł
                        spełnić żądania w ciągu miesiąca, spełni je w ciągu
                        kolejnych dwóch miesięcy informując użytkownika
                        uprzednio w terminie miesiąca od otrzymania żądania - o
                        zamierzonym przedłużeniu terminu oraz jego przyczynach.
                    </li>
                    <li>
                        Odbiorcą danych osobowych Użytkownika mogą być podmioty,
                        którym Administrator ma obowiązek przekazywania danych
                        na gruncie obowiązujących przepisów prawa, w tym
                        właściwe Urzędy Skarbowe, a w określonych ustawowo
                        przypadkach Generalny Inspektor Informacji Finansowej, a
                        także pomioty, które realizują na rzecz Administratora
                        usługi IT, usługi księgowo-rachunkowe lub doradztwa
                        prawnego, w zakresie niezbędnym do świadczenia tych
                        usług.
                    </li>
                    <li>
                        Administrator może odmówić usunięcia Danych Osobowych, w
                        uzasadnionym przypadku a w szczególności, jeżeli
                        Użytkownik:
                        <ul>
                            <li>
                                nie uregulował wszystkich należności wobec
                                Administratora, lub
                            </li>
                            <li>
                                naruszył regulamin Serwisu lub jakiejkolwiek
                                Usługi, lub
                            </li>
                            <li>naruszył obowiązujące przepisy prawa,</li>
                            zwłaszcza w sytuacji, w której posiadanie danych
                            osobowych jest konieczne dla wyjaśnienia tych
                            okoliczności i ustaleniu ewentualnego zakresu
                            odpowiedzialności Użytkownika. W każdym przypadku
                            odmowy usunięcia danych osobowych, Administrator
                            poinformuje Użytkownika o przyczynach odmowy wraz ze
                            wskazaniem podstawy prawnej.
                        </ul>
                    </li>
                    <li>
                        Dane osobowe Użytkownika będą przechowywane przez:
                        <ul>
                            <li>
                                czas korzystania przez Użytkownika z Serwisu,
                            </li>
                            <li>
                                po zaprzestaniu korzystania z Serwisu wyłącznie
                                przez okres wymagany przepisami prawa związanymi
                                z przechowywaniem dokumentacji podatkowej,{" "}
                            </li>
                            <li>
                                po zaprzestaniu korzystania z Serwisu przez
                                okres 5 lat licząc od pierwszego dnia roku
                                następującego po roku, w którym nastąpiło
                                zakończenie stosunków gospodarczych z
                                Użytkownikiem zgodnie z wymogami ustawy o
                                przeciwdziałaniu praniu pieniędzy i finansowania
                                terroryzmu,
                            </li>
                            <li>
                                po zaprzestaniu korzystania z Serwisu w zakresie
                                niezbędnym do dochodzenia ewentualnych roszczeń
                                z tytułu świadczenia Usług przez Administratora
                                na rzecz Użytkownika przez okres przedawnienia
                                powstałego roszczenia, nie dłużej niż przez
                                okres 3 lat od wymagalności roszczenia.{" "}
                            </li>
                        </ul>
                    </li>
                    <li>
                        W przypadku stwierdzenia, że przetwarzanie danych
                        osobowych narusza przepisy RODO, osoba, której dane
                        dotyczą, ma prawo wnieść skargę do Prezesa Urzędu
                        Ochrony Danych Osobowych.
                    </li>
                </ul>

                <div className="textCenter">
                    <h3 className="themecolor biglabel">§ 5 PLIKI "COOKIES" lub „CIASTECZKA”</h3>
                </div>

                <ul>
                    <li>
                        Serwis znajdujący się pod adresem
                        https://kryptowaluty.pl korzysta z plików cookies.
                    </li>
                    <li>
                        Zaakceptowanie plików „cookies” jest konieczne do
                        prawidłowego świadczenia Usługi Serwisu na stronie
                        internetowej. W plikach „cookies" znajdują się
                        informacje niezbędne do prawidłowego funkcjonowania
                        strony, a także dają one także możliwość opracowywania
                        ogólnych statystyk odwiedzin strony internetowej.
                    </li>
                    <li>
                        Instalacja plików „cookies” jest konieczna do
                        prawidłowego świadczenia usług na stronie internetowej.{" "}
                    </li>
                    <li>
                        Pliki cookies stanowią dane informatyczne, przechowywane
                        w urządzeniu użytkownika końcowego czego celem jest
                        umożliwienie prawidłowego korzystania z Serwisu.{" "}
                    </li>
                    <li>
                        W plikach „cookies" znajdują się informacje niezbędne do
                        prawidłowego funkcjonowania Serwisu, a także dają one
                        także możliwość opracowywania ogólnych statystyk
                        odwiedzin strony internetowej. Przeglądarka internetowa
                        zazwyczaj automatycznie dopuszcza przechowywanie plików
                        cookies na urządzeniu końcowym Użytkownika, który jednak
                        może dokonać zmiany w tym zakresie lub z poziomu
                        przeglądarki dokonać blokady lub usunięcia plików
                        cookies.{" "}
                    </li>
                    <li>
                        W ramach Serwisu stosowane są dwa rodzaje plików
                        cookies: „sesyjne” (session cookies) oraz „stałe”
                        (persistent cookies). Cookies „sesyjne” są plikami
                        tymczasowymi, które przechowywane są w urządzeniu
                        końcowym Użytkownika do czasu wylogowania, opuszczenia
                        strony internetowej lub wyłączenia oprogramowania
                        (przeglądarki internetowej). „Stałe” pliki cookies
                        przechowywane są w urządzeniu końcowym Użytkownika przez
                        czas określony w parametrach plików cookies lub do czasu
                        ich usunięcia przez Użytkownika.
                    </li>
                    <li>
                        Ograniczenia stosowania plików cookies, ich blokada lub
                        usunięcie mogą wpłynąć na niektóre funkcjonalności
                        dostępne w Serwisie poprzez ich ograniczenie lub
                        uniemożliwienie korzystania z Serwisu.
                    </li>
                    <li>
                        Użytkownik ma prawo zadecydowania w zakresie dostępu
                        plików „cookies” do swojego komputera poprzez ich
                        uprzedni wybór w oknie swojej przeglądarki. Szczegółowe
                        informacje o możliwości i sposobach obsługi plików
                        „cookies” dostępne są w ustawieniach oprogramowania
                        (przeglądarki internetowej).
                    </li>
                </ul>

                <div className="textCenter">
                    <h3 className="themecolor biglabel">§ 6 POSTANOWIENIA KOŃCOWE</h3>
                </div>

                <ul>
                    <li>
                        Administrator stosuje środki techniczne i organizacyjne
                        zapewniające ochronę przetwarzanych danych osobowych
                        odpowiednią do zagrożeń oraz kategorii danych objętych
                        ochroną, a w szczególności zabezpiecza dane przed ich
                        udostępnieniem osobom nieupoważnionym, zabraniem przez
                        osobę nieuprawnioną, przetwarzaniem z naruszeniem
                        obowiązujących przepisów oraz zmianą, utratą,
                        uszkodzeniem lub zniszczeniem.
                    </li>
                    <li>
                        Administrator udostępnia odpowiednie środki techniczne
                        zapobiegające pozyskiwaniu i modyfikowaniu przez osoby
                        nieuprawnione, danych osobowych przesyłanych drogą
                        elektroniczną.
                    </li>
                    <li>
                        W sprawach nieuregulowanych niniejszą Polityką
                        prywatności stosuje się odpowiednio przepisy RODO oraz
                        inne właściwe przepisy prawa polskiego.
                    </li>
                </ul>

                <div className="textCenter getPdfTerms">
                    <h3 className="themecolor biglabel"> Pobierz politykę prywatności w formacie PDF</h3>
                    <Button
                        href={"/files/Kryptowaluty-Polityka-prywatnosci.pdf"}
                    >
                        {i18next.t("Pobierz")}
                    </Button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TermsPage;
