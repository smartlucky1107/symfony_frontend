import React from "react";
import i18next from "i18next";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import getRoute from "../../routing/routingService";
import Header from "../../head/header";
import Footer from "../../foot/footer";

import "./termsPage.scss";

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
                    <h1>R E G U L A M I N </h1>
                    <h3 className="themecolor">Serwisu internetowego kryptowaluty.pl</h3>
                </div>
                <div className="textCenter">
                    <h3 className="themecolor biglabel">§1</h3>
                </div>
                <ol>
                    <li>
                        Niniejszy Regulamin określa warunki i zasady korzystania
                        z serwisu internetowego działającego pod adresem{" "}
                        <a href="https://kryptowaluty.pl">
                            https://kryptowaluty.pl
                        </a>
                        , w tym przede wszystkim warunki i zasady świadczenia
                        usług drogą elektroniczną, ponadto opisuje wzajemne
                        prawa i obowiązki stron Umowy oraz zasady ich
                        odpowiedzialności.
                    </li>
                    <li>
                        Przed rozpoczęciem korzystania z usług świadczonych
                        przez Serwis obowiązkowe jest zapoznanie się z
                        niniejszym Regulaminem oraz jego akceptacja na stronie
                        internetowej Serwisu. W przypadku braku akceptacji
                        wszystkich postanowień Regulaminu przez Użytkownika,
                        Użytkownik winien bezzwłocznie zaniechać
                        dalszych działań i opuścić Serwis.
                    </li>
                    <li>
                        Akceptując Regulamin i uzyskując status Użytkownika
                        nadawany jest jednocześnie dostęp do funkcji Serwisu.
                    </li>
                    <li>
                        Podmiotem prowadzącym Serwis i świadczącym Usługi na
                        rzecz Użytkowników jest PARTNERIA spółka z ograniczoną
                        odpowiedzialnością z siedzibą w Krakowie, ul. Lekarska
                        1, 31-203 Kraków, posiadająca numer REGON: 384160447,
                        NIP: 9452229846, wpisana do Rejestru Przedsiębiorców
                        Krajowego Rejestru Sądowego prowadzonego przez Sąd
                        Rejonowy dla Krakowa – Śródmieścia w Krakowie, XI
                        Wydział Gospodarczy Krajowego Rejestru Sądowego pod
                        numerem 0000800221.
                    </li>
                </ol>

                <div className="textCenter">
                    <h3 className="themecolor biglabel">§2 Definicje</h3>
                </div>

                <p>
                    Na potrzeby Regulaminu przyjęto następującą definicje pojęć:
                </p>
                <ol>
                    <li>
                        Regulamin – należy przez to rozumieć niniejszy dokument
                    </li>
                    <li>
                        Serwis – należy przez to rozumieć serwis internetowy
                        prowadzony przez Administratora pod adresem{" "}
                        <a href="https://kryptowaluty.pl">
                            https://kryptowaluty.pl
                        </a>{" "}
                        oferujący Użytkownikom korzystanie z Usług, przy czym
                        Serwis w każdym czasie może oferować wszystkie lub
                        niektóre z Usług.
                    </li>
                    <li>
                        Rejestracja w Serwisie – należy przez to rozumieć
                        rejestrację w systemie teleinformatycznym Serwisu
                        polegającą na podaniu danych Użytkownika oraz ich
                        weryfikację przy wykorzystaniu dokumentu tożsamości
                        Użytkownika oraz jego aktualnego wizerunku utrwalonego w
                        sposób wskazany w Regulaminie oraz akceptacji
                        Regulaminu, która jest niezbędna do korzystania przez
                        Użytkownika z Serwisu w sposób umożliwiający korzystanie
                        z oferowanych w jego ramach Usług.
                    </li>
                    <li>
                        Administrator – należy przez to rozumieć spółkę pod
                        firmą PARTNERIA spółka z ograniczoną odpowiedzialnością
                        z siedzibą w Krakowie, ul. Lekarska 1, 31-203 Kraków,
                        posiadającą numer REGON: 384160447, NIP: 9452229846,
                        wpisaną do Rejestru Przedsiębiorców Krajowego Rejestru
                        Sądowego prowadzonego przez Sąd Rejonowy dla Krakowa –
                        Śródmieścia w Krakowie, XI Wydział Gospodarczy Krajowego
                        Rejestru Sądowego pod numerem 0000800221
                    </li>
                    <li>
                        Waluty wirtualne – należy przez to rozumieć cyfrowe
                        odwzorowanie wartości, które nie jest:
                        <ol className="alphabetical">
                            <li>
                                prawnym środkiem płatniczym emitowanym przez
                                NBP, zagraniczne banki centralne lub inne organy
                                administracji publicznej,
                            </li>
                            <li>
                                międzynarodową jednostką rozrachunkową
                                ustanawianą przez organizację międzynarodową i
                                akceptowaną przez poszczególne kraje należące do
                                tej organizacji lub z nią współpracujące,
                            </li>
                            <li>
                                pieniądzem elektronicznym w rozumieniu ustawy z
                                dnia 19 sierpnia 2011 r. o usługach płatniczych,
                            </li>
                            <li>
                                instrumentem finansowym w rozumieniu ustawy z
                                dnia 29 lipca 2005 r. o obrocie instrumentami
                                finansowymi,
                            </li>
                            <li>wekslem lub czekiem</li>
                        </ol>
                        oraz jest wymienialne w obrocie gospodarczym na prawne
                        środki płatnicze i akceptowane jako środek wymiany, a
                        także może być elektronicznie przechowywane lub
                        przeniesione albo może być przedmiotem handlu
                        elektronicznego.
                    </li>
                    <li>
                        Usługi – należy przez to rozumieć wszystkie lub niektóre
                        usługi świadczone przez Administratora na rzecz
                        Użytkownika polegające na:
                        <ol className="alphabetical">
                            <li>
                                sprzedaży lub kupnie Walut wirtualnych
                                dostępnych aktualnie w ofercie Serwisu za środki
                                pieniężne lub wymianie pomiędzy jednostkami
                                rożnych Walut wirtualnych (zwanej także w
                                Regulaminie „Usługą Wymiany”),
                            </li>
                            <li>
                                pośrednictwie w sprzedaży lub kupnie Walut
                                wirtualnych za środki pieniężne pomiędzy
                                Użytkownikami Serwisu,
                            </li>
                            <li>
                                przelewie Walut wirtualnych na Portfel innego
                                Użytkownika Serwisu,
                            </li>
                            <li>
                                przechowywaniu w Portfelu Walut wirtualnych
                                Użytkownika nabytych przy wykorzystaniu Serwisu
                                w ramach usługi określonej w punkcie a) lub b)
                                powyżej lub przeniesionych przez Użytkownika z
                                innego portfela wirtualnego,
                            </li>
                        </ol>
                    </li>
                    <li>
                        Inne Usługi – usługi oferowane przez Administratora na
                        rzecz Użytkownika lub Użytkownika Demo, inne niż
                        wskazane w punkcie 6 powyżej polegające w szczególności
                        na dostępie do danych o charakterze wyłącznie
                        informacyjnym takich jak aktualny kurs Walut Wirtualnych
                        lub artykuły opublikowane w Serwisie. Do korzystania z
                        Innych Usług nie jest wymagana Rejestracja w Serwisie, a
                        wystarczającym jest podanie przez osobę korzystającą z
                        Innych Usług swojego imienia i nazwiska lub nazwy,
                        adresu e-mail oraz numeru telefonu.
                    </li>
                    <li>
                        Procesor Płatności – należy przez to rozumieć zewnętrzny
                        i niezależny w stosunku do Serwisu podmiot świadczący na
                        rzecz Administratora usługi płatnicze drogą
                        elektroniczną. Usługi świadczone przez Procesor
                        Płatności polegają na obsłudze płatności Użytkowników na
                        rzecz Administratora z tytułu Usługi świadczonej przez
                        Administratora na rzecz Użytkownika. W przypadku wyboru
                        przez Użytkownika płatności przy wykorzystaniu usług
                        świadczonych przez Procesor Płatności, Użytkownik
                        zobligowany jest do jej realizacji przy wykorzystaniu
                        uzupełnionego lub częściowo uzupełnionego formularza
                        udostępnionego przez Procesor Płatności, do którego
                        zostanie przekierowany z Serwisu. W takim przypadku
                        warunkiem realizacji Usługi jest dokonanie operacji w
                        serwisie Procesora Płatności przy wykorzystaniu
                        niezmienionych danych względem tych wprowadzonych na
                        stronie Serwisu. Procesor Płatności od wykonanej
                        transakcji pobiera opłatę niezależną od opłaty
                        pobieranej przez Serwis na warunkach określonych przez
                        Procesora Płatności. Procesorem Płatności jest FENIGE
                        spółka z ograniczoną odpowiedzialnością z siedzibą w
                        Warszawie (ul. Cząstkowska 14, 01-978 Warszawa, NIP:
                        1182092036, REGON: 146693435) wpisana do rejestru
                        przedsiębiorców Krajowego Rejestru Sądowego prowadzonego
                        przez Sąd Rejonowy dla m. st. Warszawy w Warszawie, XII
                        Wydział Gospodarczy Krajowego Rejestru Sądowego pod
                        numerem 0000461471.
                    </li>
                    <li>
                        Umowa – należy przez to rozumieć skonkretyzowany w
                        ramach Stosunku Gospodarczego stosunek prawny łączący
                        Użytkownika z Administratorem, którego przedmiotem jest
                        świadczenie przez Administratora na rzecz Użytkownika
                        jednej z Usług za wynagrodzeniem określonym w
                        Regulaminie.
                    </li>
                    <li>
                        Portfel – należy przez to rozumieć wyodrębnioną w
                        infrastrukturze Serwisu przestrzeń przypisaną
                        indywidualnie do Użytkownika ukazującą przysługującą
                        Użytkownikowi wartość środków (wyrażoną w walutach FIAT
                        lub Walutach wirtualnych), którą może wykorzystać do
                        korzystania z Usług lub może żądać ich wypłaty na
                        prowadzony na jego rzecz rachunek płatniczy (w zakresie
                        środków pieniężnych) lub portfel wirtualny (w zakresie
                        Walut wirtualnych). Wartość środków pieniężnych
                        wskazanych w Portfelu nie stanowi wkładu lub depozytu
                        Użytkownika, lecz wysokość przysługującego mu w stosunku
                        do Administratora roszczenia o zapłatę w terminach i na
                        warunkach określonych w Regulaminie.
                    </li>
                    <li>
                        Formularz zamówienia – należy przez to rozumieć
                        formularz udostępniony w infrastrukturze Serwisu
                        uzupełniany przez Użytkownika celem zawarcia Umowy na
                        Usługę Wymiany, określający jej parametry i stanowiący
                        ofertę realizacji Usługi Wymiany.
                    </li>
                    <li>
                        Użytkownik - należy przez to rozumieć:
                        <ol className="alphabetical">
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
                        </ol>
                    </li>
                    <li>
                        Użytkownik Demo – należy przez to rozumieć osobę
                        fizyczną posiadającą pełną zdolność do czynności
                        prawnych będącą obywatelem Państwa Członkowskiego Unii
                        Europejskiej lub Państwa lub osobę prawną lub jednostką
                        organizacyjną nieposiadającą osobowości prawnej, której
                        ustawa przyznaje zdolność prawną, posiadającą siedzibę w
                        Państwie Członkowskim Unii Europejskiej lub Państwie
                        Stronie Europejskiego Obszaru Gospodarczego, która
                        założyła konto w Serwisie, lecz nie dokonała Rejestracji
                        w Serwisie. Użytkownik Demo ma wyłącznie możliwość
                        korzystania z Innych Usług. Użytkownik Demo zakładając
                        Konto w Serwisie zobowiązany jest do podania swojego
                        imienia i nazwiska lub nazwy, adresu e-mail oraz numeru
                        telefonu.
                    </li>
                    <li>
                        Konto – należy przez to rozumieć część wirtualnej
                        przestrzeni Serwisu, przeznaczoną do wyłącznego
                        korzystania z niej przez Użytkownika, utworzoną przez
                        niego osobiście, przy wykorzystaniu wymaganych danych
                        Użytkownika oraz po przeprowadzeniu weryfikacji
                        tożsamości w ramach której podejmuje on swoje działania
                        w sposób samodzielny i świadomy. Integralną częścią
                        Konta Użytkownika jest Portfel. Użytkownicy Demo
                        korzystają z Konta wyłącznie w zakresie umożliwiającym
                        korzystanie z Innych Usług.
                    </li>
                    <li>
                        Ustawę – należy przez to rozumieć ustawę z dnia 1 marca
                        2018 r. o przeciwdziałaniu praniu pieniędzy i
                        finansowaniu terroryzmu wdrażającą dyrektywę Parlamentu
                        Europejskiego i Rady (UE) 2015/849 z dnia 20 maja 2015
                        r. w sprawie zapobiegania wykorzystywaniu systemu
                        finansowego do prania pieniędzy lub finansowania
                        terroryzmu, zmieniającą rozporządzenie Parlamentu
                        Europejskiego i Rady (UE) nr 648/2012 i uchylającą
                        dyrektywę Parlamentu Europejskiego i Rady 2005/60/WE
                        oraz dyrektywę Komisji 2006/70/WE.
                    </li>
                    <li>
                        Stosunek Gospodarczy – należy przez to rozumieć stosunek
                        prawny łączący Administratora z Użytkownikiem wskutek
                        dokonanej przez Użytkownika Rejestracji w Serwisie
                        trwający przez cały czas posiadania statusu Użytkownika
                        umożliwiający zawieranie Umów, których przedmiotem jest
                        świadczenie przez Administratora Usług na rzecz
                        Użytkownika.
                    </li>
                    <li>
                        Procedura KYC – należy przez to rozumieć przeprowadzaną
                        przez Administratora niezbędną do Rejestracji w Serwisie
                        procedurę zgodną z Ustawą polegającą na:
                        <ol className="alphabetical">
                            <li>
                                identyfikacji tożsamości Użytkownika poprzez
                                zebranie od osoby inicjującej Rejestrację w
                                Serwisie jej danych indentyfikacyjnych oraz
                                weryfikację podanych przez tę osobę danych z jej
                                dokumentem tożsamości, jej aktualnym wizerunkiem
                                twarzy oraz poprzez wykonanie Przelewu
                                Weryfikacyjnego,
                            </li>
                            <li>
                                dostarczenie innych niezbędnych danych
                                potwierdzających prawdziwość wskazanych danych
                                identyfikacyjnych,
                            </li>
                            <li>
                                złożenie stosownych oświadczeń, w tym w zakresie
                                posiadania statusu osoby zajmującej eksponowane
                                stanowisko polityczne, członka jej rodziny lub
                                jej znanego współpracownika, o których mowa w
                                art. 2 ust. 2 Ustawy,
                            </li>
                            <li>wskazaniu celu zawarcia Umowy </li>
                        </ol>
                        przy czym Administrator może w każdym czasie trwania
                        Stosunków Gospodarczych żądać od Użytkownika dokonania
                        wszystkich lub niektórych z wyżej wymienionych czynności
                        lub dokonania innych czynności niezbędnych do
                        zapewnienia działania Serwisu zgodnie z przepisami
                        Ustawy.
                    </li>
                    <li>
                        Przelew Weryfikacyjny – należy przez to rozumieć
                        polecenie przelewu dokonane przez Użytkownika na rzecz
                        Administratora obejmujące środki pieniężne o wartości
                        nie większej niż 1,00 zł lub inna pojedyncza podstawowa
                        jednostka płatniczka w innej walucie FIAT niż złoty,
                        które po potwierdzeniu danych Użytkownika w ramach
                        Rejestracji w Serwisie zostają zwrócone na rachunek, z
                        którego został zainicjowany Przelew Weryfikacyjny. Celem
                        przeprowadzenia Przelewu Weryfikacyjnego jest
                        potwierdzenie danych osobowych Użytkownika
                        wykorzystanych w procesie Rejestracji w Serwisie oraz
                        weryfikacja posiadania przez Użytkownika
                        wykorzystywanego w Serwisie rachunku płatniczego.
                        Administrator może także dokonać weryfikacji rachunku
                        płatniczego Użytkownika w inny sposób, w tym w
                        szczególności Administrator może zażądać przedłożenia
                        dokumentów poświadczających własność rachunku, w tym w
                        szczególności aktualnego wyciągu z rachunku bankowego
                        lub umowy o prowadzenie rachunku płatniczego.
                    </li>
                </ol>

                <div className="textCenter">
                    <h3 className="themecolor biglabel">§3 Warunki świadczenia Usług</h3>
                </div>

                <ol>
                    <li>
                        Celem Serwisu jest zawieranie Umów w zakresie
                        oferowanych przez Administratora Usług. Administrator
                        oferuje w danym czasie wszystkie lub niektóre Usługi.
                        Niedostępność wszystkich Usług lub jej ograniczona
                        dostępność, w tym w zakresie oferowanych rodzajów Walut
                        Wirtualnych, nie stanowi naruszenia Regulaminu lub
                        Stosunku Gospodarczego i nie skutkuje powstaniem po
                        stronie Użytkownika jakichkolwiek roszczeń w stosunku do
                        Administratora.
                    </li>
                    <li>
                        Korzystanie przez Użytkownika z Usług możliwe jest po
                        dokonaniu Rejestracji w Serwisie. Założenia konta w
                        Serwisie nie jest tożsame z Rejestracją w Serwisie.
                        Założenie konta umożliwia wyłącznie korzystanie z Innych
                        Usług.
                    </li>
                    <li>
                        Nie wymaga Rejestracji w Serwisie uzyskanie dostępu do
                        Innych Usług.
                    </li>
                    <li>
                        Świadczenie Usług jest odpłatne. Wynagrodzenie
                        Administratora za świadczenie Usługi Wymiany zawarte
                        jest w oferowanym przez Administratora kursie Waluty
                        wirtualnej. Wynagrodzenie z tytułu świadczenia Usług
                        innych niż wskazane w zdaniu poprzedzającym określone są
                        w Tabeli Opłat opublikowanej w Serwisie.
                    </li>
                    <li>
                        Korzystanie z Serwisu, w tym w szczególności zawieranie
                        Umów obejmujących oferowane przez Administratora Usługi
                        wymaga spełnienia przez Użytkownika warunków
                        technicznych określonych w §4 Regulaminu.
                    </li>
                    <li>
                        W celu zawarcia Umowy obejmującej Usługę Wymiany
                        Użytkownik musi wprowadzić oraz zaakceptować w
                        Formularzu zamówienia postanowienia przedmiotowe Umowy
                        przy wykorzystaniu aktualnego kursu wymiany dostępnego w
                        Serwisie, w tym rodzaj oraz wielkość wolumenu Waluty
                        wirtualnej oferowanej przez Serwis w chwili zawierania
                        Umowy. Umowa obejmująca Usługę Wymiany zostają zawarta z
                        momentem:
                        <ol className="alphabetical">
                            <li>
                                uznania rachunku płatniczego Administratora lub
                                Pośrednika Płatności kwotą stanowiącą płatność
                                obejmującą wartość nabywanych przez Użytkownika
                                Walut Wirtualnych – w przypadku Umowy obejmujące
                                kupno przez Użytkownika Walut Wirtualnych,
                            </li>
                            <li>
                                uznania portfela wirtualnego Administratora o
                                wolumen Waluty Wirtualnej – w przypadku Umowy
                                obejmujące sprzedaż przez Użytkownika Walut
                                Wirtualnych.
                            </li>
                        </ol>
                    </li>
                    <li>
                        Serwis w sposób stały monitoruje kursy Walut
                        wirtualnych, które oferuje Użytkownikom oraz realizuje
                        Usługę Wymiany w oparciu o dostępny parametr kursu
                        najbardziej korzystny dla Użytkownika w chwili
                        zakończenia procesu wypełniania formularza zamówienia, o
                        którym mowa w ustępie 6 powyżej. Przed zakończeniem
                        procesu wypełniania formularza zamówienia Użytkownik
                        może zobaczyć szacunek dotyczący ekwiwalentu kupowanej
                        lub sprzedawanej Waluty, jednak nie jest ona wiążąca, a
                        stanowi wartość orientacyjną, gdyż wartość ta może ulec
                        zmianie do czasu zakończenia procesu składania
                        zamówienia na Usługę Wymiany.
                    </li>
                    <li>
                        Pochodzące ze sprzedaży Walut Wirtualnych środki
                        pieniężne przypisane do Portfela Użytkownika nie
                        stanowią wkładu lub depozytu Użytkownika, lecz stanowią
                        określenie wartości roszczenia o zapłatę przysługującego
                        Użytkownikowi w stosunku do Administratora z tytułu
                        sprzedaży Walut Wirtualnych. Użytkownik może żądać
                        zapłaty tych środków w sposób określony w punkcie 11
                        poniżej („Wypłata z Serwisu”).
                    </li>
                    <li>
                        Zlecenie Usługi, o której mowa w §2 pkt 6 ppkt c)
                        Regulaminu wymaga znajomości i wskazania w Serwisie
                        przez Użytkownika zlecającego przelew Walut Wirtualnych
                        adresu e-mail lub numeru telefonu Użytkownika będącego
                        odbiorców Walut Wirtualnych wykorzystanego przez niego
                        przy Rejestracji w Serwisie.
                    </li>
                    <li>
                        Nabyte lub otrzymane w drodze usługi wewnętrznego
                        przelewu przez Użytkownika Waluty Wirtualne zostaną
                        przypisane do odpowiedniego Portfela Użytkownika w
                        momencie ich zaksięgowania przez Serwis.
                    </li>
                    <li>
                        W przypadku zlecenia wypłaty środków na rzecz innego
                        Użytkownika operacja zostaje wykonana niezwłocznie po
                        jej zleceniu oraz zatwierdzeniu operacji, przy
                        wykorzystaniu jednorazowego hasła przesłanego na adres
                        e-mail lub numer telefonu Użytkownika, jednak nie
                        później niż w przeciągu 3 dni roboczych od dnia w którym
                        doszło do zlecenia wypłaty lub przelewu na rzecz innego
                        Użytkownika. Wypłata środków pieniężnych przysługujących
                        Użytkownikowi od Administratora przypisanych do niego w
                        Portfelu poza Serwis możliwa jest wyłącznie na rachunek
                        płatniczy prowadzony na rzecz tego Użytkownika.
                    </li>
                    <li>
                        Serwis nie świadczy usług innych niż opisane w §2 pkt 6
                        i 7 Regulaminu, a zwłaszcza usług polegających na
                        doradztwie inwestycyjnym. Administrator nie zatrudnia w
                        tym celu żadnych pracowników, nie współpracuje z
                        zewnętrznymi konsultantami lub jakimikolwiek innymi
                        podmiotami świadczącymi usługi brokerskie lub
                        pośrednictwa inwestycyjnego.
                    </li>
                    <li>
                        Wykonanie Usługi określonej §2 pkt 6 ppkt c) Regulaminu
                        lub zlecenie Wypłaty z Serwisu wymaga potwierdzenia
                        przez Użytkownika poprzez wprowadzenie hasła przesłanego
                        na jego adres e-mail wskazany przy Rejestracji w
                        Serwisie, a w przypadku korzystania przez Użytkownika z
                        uwierzytelniania wielopoziomowego (2FA) przy
                        wykorzystaniu hasła przesłanego na jego adres e-mail
                        oraz numer telefonu wskazane przy Rejestracji w
                        Serwisie.
                    </li>
                    <li>
                        Użytkownik będący osobą fizyczną zobowiązany jest do
                        samodzielnego i osobistego korzystania z Serwisu, w tym
                        w szczególności do osobistego korzystania z Usług. Do
                        korzystania z Serwisu, w tym w szczególności w zakresie
                        korzystania z Usług, przez Użytkownika niebędącego osobą
                        fizyczną uprawnione są wyłącznie osoby uprawnione do
                        jego reprezentacji lub pełnomocnicy zgłoszeni w
                        Serwisie. Użytkownik nie może przekazywać innym
                        nieuprawnionym osobom danych umożliwiających logowanie w
                        Serwisie, urządzeń wykorzystywanych do autoryzacji Usług
                        zgodnie z ustępem 14 powyżej lub tamże wskazanych haseł
                        autoryzacyjnych.
                    </li>
                    <li>
                        Administrator zastrzega możliwość odmowy wykonania
                        Usługi i zawarcia Umowy w sytuacji, w której poweźmie
                        uzasadnione przekonanie o niesamodzielnym korzystaniu z
                        Serwisu. W przypadku istotnej wagi naruszenia lub
                        powtarzającego się naruszenia zobowiązania określonego w
                        ustępie 15 powyżej, Administrator zastrzega możliwość
                        dokonania tymczasowej blokady Konta Użytkownika na okres
                        do 30 dni lub rozwiązania Stosunków Gospodarczych z
                        Użytkownikiem.
                    </li>
                    <li>
                        W przypadku kontaktu z Użytkownikiem podmiotów
                        podających się za pracowników lub współpracowników
                        Serwisu, Użytkownik winien zachować szczególną
                        ostrożność, a w szczególności nie przesyłać zakupionych
                        w Serwisie Walut Wirtualnych na portfele wirtualne
                        wskazane przez takie osoby, do których Użytkownik nie
                        posiada klucza dostępu. Każdy przypadek podejrzanego
                        kontaktu ze strony podmiotów podających się za
                        pracowników lub współpracowników Serwisu, Użytkownik
                        winien zgłosić Administratorowi na adres mailowy:{" "}
                        <a href="mailto:support@kryptowaluty.pl">
                            support@kryptowaluty.pl
                        </a>
                        . Pracownicy lub współpracownicy Serwisu kontaktujący
                        się z Użytkownikiem będą w stanie dokonać swojej
                        weryfikacji poprzez podanie Użytkownikowi danych
                        podanych przez niego podczas Rejestracji w Serwisie lub
                        danych jego Konta.
                    </li>
                    {/* <li>
                        Serwis inicjuje ze swojej strony kontakt z Użytkownikiem
                        wyłącznie przy wykorzystaniu wewnętrznego interfejsu
                        Serwisu lub drogą elektroniczną przy wykorzystaniu
                        adresu e-mail{" "}
                        <a href="mailto:support@kryptowaluty.pl">
                            support@kryptowaluty.pl
                        </a>
                        . Serwis nigdy nie żąda od Użytkowników przesyłania
                        posiadanych przez Użytkownika Walut Wirtualnych na
                        portfel wirtualny pozostający poza funkcjonalnością
                        Serwisu. W przypadku kontaktu z Użytkownikiem podmiotów
                        podających się za pracowników lub współpracowników
                        Serwisu, Użytkownik winien zachować szczególną
                        ostrożność, a w szczególności nieprzesyłanie zakupionych
                        w Serwisie Walut Wirtualnych na portfele wirtualne
                        wskazane przez takie osoby, do których Użytkownik nie
                        posiada kluczu dostępu. Każdy przypadek podejrzanego
                        kontaktu ze strony podmiotów podających się za
                        pracowników lub współpracowników Serwisu, Użytkownik
                        winien zgłosić Administratorowi na adres mailowy:{" "}
                        <a href="mailto:support@kryptowaluty.pl">
                            support@kryptowaluty.pl
                        </a>
                        .
                    </li> */}
                    <li>
                        W przypadku podejrzenia naruszenia prawa, postanowień
                        Regulaminu, praw Administratora lub osób trzecich albo
                        zasad współżycia społecznego, Administrator może
                        czasowo, na okres nie dłuższy niż 30 dni, zablokować
                        Użytkownikowi dostęp do Serwisu i wstrzymać realizację
                        Usług do momentu wyjaśnienia czy naruszenie miało
                        miejsce. W przypadku stwierdzenia naruszenia
                        Administrator może ostrzec Użytkownika przed
                        stwierdzonymi zachowaniami albo, w przypadku
                        stwierdzenia przez Administratora istotności naruszenia,
                        wypowiedzieć ze skutkiem natychmiastowym Stosunki
                        Gospodarcze i bezterminowo zablokować dostęp Użytkownika
                        do Serwisu.{" "}
                    </li>
                </ol>

                <div className="textCenter">
                    <h3 className="themecolor biglabel">§4 Wymogi techniczne korzystania z Serwisu i Usług.</h3>
                </div>

                <ol>
                    <li>
                        Korzystanie z Serwisu wymaga zapewnienia przez
                        Użytkownika we własnym zakresie:
                        <ol className="alphabetical">
                            <li>
                                dostępu do urządzenia umożliwiającego nawiązanie
                                połączenia z siecią Internet (np. PC, laptop,
                                smartfon, tablet),
                            </li>
                            <li>
                                zainstalowania na urządzeniu, o którym mowa w
                                ppkt a), przeglądarki internetowej w aktualnej
                                wersji oferowanej przez jej dostawcę,
                            </li>
                            <li>
                                zaakceptowanie w przeglądarce polityki plików
                                Cookies.
                            </li>
                        </ol>
                    </li>
                    <li>
                        Rejestracja w Serwisie wymaga:
                        <ol className="alphabetical">
                            <li>
                                posiadania adresu poczty elektronicznej, do
                                której Użytkownik ma wyłączny, osobisty i
                                nieograniczony dostęp,
                            </li>
                            <li>
                                posiadania telefonu komórkowego wraz z numerem
                                telefonu zarejestrowanym na terytorium jednego z
                                Państw Członkowskich Unii Europejskiej lub
                                Państw Strony Europejskiego Obszaru
                                Gospodarczego,
                            </li>
                            <li>
                                posiadania dostępu do urządzenia umożliwiającego
                                przeprowadzenie weryfikacji jego tożsamości
                                zapewniającego dostęp do funkcji aparatu i
                                kamery (np. PC z urządzeniami peryferyjnymi,
                                laptop, smartfon, tablet),
                            </li>
                        </ol>
                    </li>
                    <li>
                        Korzystanie z Usług wymaga:
                        <ol className="alphabetical">
                            <li>
                                spełnienia wymogów określonych w pkt. 2 powyżej,
                            </li>
                            <li>
                                posiadania rachunku płatniczego, którego
                                Użytkownik jest posiadaczem lub
                                współposiadaczem,{" "}
                            </li>
                            <li>
                                posiadania dostępu do portfela wirtualnego
                                przeznaczonego do przechowywania Walut, przy
                                czym za dostęp do takiego portfela rozumienie
                                się posiadanie do niego klucza publicznego – w
                                przypadku świadczenia Usług, o których mowa w §2
                                pkt 6 ppkt a)-b) Regulaminu.
                            </li>
                        </ol>
                    </li>
                    <li>
                        Jeżeli Użytkownik zamierza korzystać z dodatkowego
                        zabezpieczenia związanego z autoryzacją wielopoziomową
                        (2FA) za pośrednictwem zewnętrznej aplikacji
                        autoryzującej jest zobowiązany do pobrania jej we
                        własnym zakresie, na własny koszt i własne ryzyko.
                    </li>
                    <li>
                        Zmiana wymogów technicznych dotyczących korzystania z
                        Serwisu i jego Usług nie stanowi Regulaminu, o ile
                        zmiana ta nie będzie istotna w ten sposób, że może
                        istotnie ograniczyć lub pozbawić Użytkownika dostępu do
                        Serwisu.
                    </li>
                    <li>
                        Serwis zapewnia Użytkownikom dostęp do Serwisu i jego
                        Usług w sposób ciągły jednocześnie zastrzegając, iż:
                        <ol className="alphabetical">
                            <li>
                                może dojść do ograniczenia niektórych lub
                                wszystkich funkcji Serwisu ze względu na
                                regulacje prawne obowiązujące na danym
                                terytorium,
                            </li>
                            <li>
                                może dojść do ograniczenia niektórych lub
                                wszystkich funkcji Serwisu, w tym do zakończenia
                                świadczenia niektórych lub wszystkich Usług, w
                                tym Innych Usług, ze względu na konieczność
                                wykonania prac technicznych o charakterze
                                konserwacji infrastruktury Serwisu, modernizacji
                                infrastruktury Serwisu lub wdrażania nowych
                                funkcji,
                            </li>
                            <li>
                                może dojść do ograniczenia lub braku dostępu do
                                niektórych lub wszystkich funkcji Serwisu, w tym
                                ograniczenia świadczenia niektórych lub
                                wszystkich Usług, w tym innych Usług, w związku
                                z wystąpieniem awarii lub konieczności
                                przeprowadzenia prac mających na celu usunięcie
                                powstałej awarii.
                            </li>
                        </ol>
                    </li>
                    <li>
                        W sytuacji wystąpienia awarii lub okoliczności
                        wskazujących na możliwość wystąpienia awarii
                        infrastruktury teleinformatycznej związanej z
                        działalnością Serwisu lub Procesora Płatności,
                        Administrator zastrzega sobie prawo do zablokowania
                        dostępu Użytkowników do funkcji Serwisu do momentu
                        uchylenia zagrożenia lub usunięcia awarii.{" "}
                    </li>
                </ol>

                <div className="textCenter">
                    <h3 className="themecolor biglabel">§5 Rejestracja w Serwisie</h3>
                </div>

                <ol>
                    <li>
                        Pełny dostęp do funkcjonalności Serwisu i korzystanie z
                        Usług wymaga Rejestracji w Serwisie. Rejestracja odbywa
                        się w Serwisie.
                    </li>
                    <li>
                        Dokonując Rejestracji w Serwisie, rejestrujący się
                        Użytkownik ma obowiązek wskazywania wyłącznie
                        prawdziwych, kompletnych i rzetelnych informacji i
                        danych. Jeżeli zaistnieją okoliczności wskazujące na
                        nieprawdziwość lub niekompletność wprowadzonych danych
                        lub informacji dostęp do Serwisu, w tym do korzystania z
                        Usług lub Innych Usług, może zostać zawieszony do czasu
                        wyjaśnienia tych okoliczności i uzyskania prawdziwych i
                        kompletnych danych lub informacji.
                    </li>
                    <li>
                        Rejestracja w Serwisie wymaga przeprowadzenia Procedury
                        KYC, w ramach której konieczne jest samodzielne
                        wskazanie przez rejestrującego się Użytkownika
                        następujących danych i informacji:
                        <ol className="alphabetical">
                            <li>
                                w przypadku Użytkownika będącego osobą fizyczną
                                nieprowadzącą działalności gospodarczej: imię,
                                nazwisko, numer PESEL lub datę urodzenia w
                                przypadku nieposiadania przyznanego numeru
                                PESEL, obywatelstwo, numer i serię dokumentu
                                tożsamości, adres zamieszkania, adres poczty
                                elektronicznej, numer telefonu zarejestrowanego
                                na terenie UE lub EOG,
                            </li>
                            <li>
                                w przypadku osób fizycznych prowadzących
                                działalność gospodarczą: dane wskazane w ppkt a)
                                powyżej, a ponadto NIP oraz miejsce prowadzenia
                                działalności,
                            </li>
                            <li>
                                w przypadku Użytkownika będącego osobą prawną
                                lub jednostką organizacyjną nieposiadającą
                                osobowości prawnej, której ustawa przyznaje
                                zdolność prawną: firmę (nazwę), formę
                                organizacyjną, siedzibę lub adres prowadzenia
                                działalności, NIP (a w przypadku jego
                                nieposiadania numer w rejestrze handlowym i datę
                                rejestracji), główny przedmiot działalności,
                                adres strony internetowej w przypadku jej
                                posiadania, adres poczty elektronicznej, numer
                                telefonu zarejestrowanego na terenie UE lub EOG,
                                a także imię i nazwisko oraz numer PESEL osób
                                uprawnionych do reprezentacji Użytkownika oraz
                                imię, nazwisko i obywatelstwo beneficjenta
                                rzeczywistego Użytkownika,
                            </li>
                        </ol>
                    </li>
                    <li>
                        Rejestracja w Serwisie wymaga weryfikacji danych
                        wskazanych w pkt 3 powyżej, w tym:
                        <ol className="alphabetical">
                            <li>
                                w przypadku osób fizycznych nieprowadzących
                                działalności gospodarczej oraz reprezentantów
                                Użytkowników, o których mowa w pkt. 3 ppkt. c)
                                powyżej, polegającej na wykonaniu przez
                                Użytkownika zdjęcia utrwalającego jego wizerunek
                                oraz wydany dla niego dokument tożsamości przy
                                wykorzystaniu funkcjonalności Serwisu,
                            </li>
                            <li>
                                w przypadku osób fizycznych prowadzących
                                działalność gospodarczą polegającej na wykonaniu
                                przez Użytkownika zdjęcia utrwalającego jego
                                wizerunek oraz wydany dla niego dokument
                                tożsamości przy wykorzystaniu funkcjonalności
                                Serwisu oraz przesłaniu wypisu z Centralnej
                                Ewidencji i Informacji o Działalności
                                Gospodarczej lub innego właściwego organu
                                rejestrowego,
                            </li>
                            <li>
                                w przypadku osób prawnych lub jednostek
                                organizacyjnych nieposiadających osobowości
                                prawnej polegającej na przesłaniu odpisu
                                aktualnego z rejestru przedsiębiorców Krajowego
                                Rejestru Sądowego lub innego właściwego rejestru
                                handlowego.
                            </li>
                        </ol>
                    </li>
                    <li>
                        Rejestrujący się Użytkownik zobowiązany jest do
                        wykonywania czynności, o których mowa w ustępach 3-4
                        powyżej, samodzielnie, chyba że pomoc osób trzecich jest
                        niezbędna z uwagi na stan zdrowia lub konieczność
                        zapewnienia pomocy technicznej.
                    </li>
                    <li>
                        Dokument tożsamości wykorzystywany do weryfikacji
                        rejestrującego się Użytkownika musi być dokumentem
                        wydanym przez uprawniony organ państwa wydającego
                        posiadającym przymiot dokumentu tożsamości zgodnie z
                        prawem kraju wydającego oraz zawierać wskazane w pkt. 3
                        ppkt. a) powyżej dane. Nie można przeprowadzić
                        weryfikacji Użytkownika przy wykorzystaniu dokumentu
                        tożsamości nieważnego, zniszczonego, nieczytelnego lub
                        niezawierającego wizerunku jego posiadacza. W przypadku
                        Użytkowników będących obywatelami Rzeczypospolitej
                        Polskiej lub posiadającymi prawo pobytu na jej
                        terytorium, dokumentem tożsamości umożliwiającym
                        weryfikację jest dowód osobisty, paszport lub karta
                        pobytu.
                    </li>
                    <li>
                        Rejestrujący się Użytkownik zobowiązany jest także do
                        złożenia oświadczenia co do posiadania przez niego, jego
                        reprezentantów lub beneficjentów rzeczywistych statusu
                        osoby zajmującej eksponowane stanowisko politycznego,
                        członka rodziny takiej osoby lub jej znanego
                        współpracownika.
                    </li>
                </ol>

                <div className="textCenter">
                    <h3 className="themecolor biglabel">§6 Płatności</h3>
                </div>

                <ol>
                    <li>
                        Zapłata za nabywane przez Użytkownika Usługi następuje
                        przy wykorzystaniu udostępnionych w Serwisie metod
                        płatności i przy wykorzystaniu funkcjonalności Serwisu.
                    </li>
                    <li>
                        Zapłata za nabywane przez Użytkownika Usługi następuje
                        po zleceniu Administratorowi wykonania Usługi, w tym w
                        przypadku Usługi Wymiany, po uzupełnieniu i
                        zaakceptowaniu Formularzu zamówienia.
                    </li>
                    <li>
                        Użytkownik dokonuje płatności za Usługi przy
                        wykorzystaniu wydanej na jego rzecz karty płatniczej lub
                        innego podobnego instrumentu płatniczego inicjowanej
                        przez Administratora jako akceptanta płatności. Płatność
                        obsługiwana jest przez Procesora Płatności.
                    </li>
                    <li>
                        Maksymalna jednorazowa wartość Usługi, za którą
                        Użytkownik dokonuje płatności nie może przekroczyć
                        50.000,00 zł.
                    </li>
                    <li>
                        Użytkownik może mieć zarejestrowane w Serwisie w jednym
                        czasie nie więcej niż 3 karty płatnicze.
                    </li>
                    <li>
                        Serwis nie obsługuje instrumentów płatniczych
                        pochodzących od wydawców mających siedzibę w Sudanie,
                        Sudanie Południowym, Wybrzeżu Kości Słoniowej, Benin,
                        Mali, Burkina Faso, Senegal, Togo, USA, Gwinei Bissau,
                        Pakistanie, Syrii, Jemenie, Libii.
                    </li>
                    <li>
                        Użytkownik zobowiązany jest do korzystania z karty
                        płatniczej wydanej na jego rzecz. Użytkownik zobowiązany
                        jest do przestrzegania bezwzględnie obowiązujących
                        przepisów prawa oraz zasad korzystania z kart
                        płatniczych (instrumentów płatniczych) wydanych przez
                        ich wydawcę.
                    </li>
                    <li>
                        Przy dokonywaniu pierwszej płatności w sposób wskazany w
                        punkcie 3 powyżej, Procesor Płatności pobiera opłatę
                        weryfikacyjną w kwocie od 1,00 zł do 5,00 zł z tytułu
                        weryfikacji Użytkownika jako uprawnionego do korzystania
                        z używanej przy płatności karty płatniczej (lub innego
                        instrumentu płatniczego). Administrator lub Procesor
                        Płatności mogą pobierać od Użytkowników dodatkowe opłaty
                        z tych realizacji usługi płatniczej. O wysokości
                        należnej opłaty Użytkownik zostanie poinformowany przed
                        dokonaniem płatności.
                    </li>
                    <li>
                        Administrator nie ponosi odpowiedzialności względem
                        Użytkownika w przypadku niedostępności w danym czasie
                        niektórych lub wszystkich akceptowalnych przez
                        Administratora metod płatności określonych w pkt. 3
                        powyżej.
                    </li>
                </ol>

                {/* <ol>
                    <li>
                        Zapłata za nabywane przez Użytkownika Usługi następuje
                        przy wykorzystaniu udostępnionych w Serwisie metod
                        płatności i przy wykorzystaniu funkcjonalności Serwisu.
                    </li>
                    <li>
                        Zapłata za nabywane przez Użytkownika Usługi następuje
                        po zleceniu Administratorowi wykonania Usługi, w tym w
                        przypadku Usługi Wymiany po uzupełnieniu i
                        zaakceptowaniu Formularzu zamówienia.
                    </li>
                    <li>
                        Administrator udostępnia następujące metody płatności
                        dostępne w Serwisie:
                        <ol>
                            <li>
                                płatność szybkim przelewem (zlecenie przelewu z
                                automatycznie uzupełnionymi danymi formularza
                                przelewu),
                            </li>
                            <li>
                                płatność przy wykorzystaniu karty płatniczej lub
                                innego podobnego instrumentu płatniczego
                                inicjowana przez Administratora jako akceptanta
                                płatności.
                            </li>
                        </ol>
                    </li>
                    <li>
                        Płatności Użytkowników na rzecz Administratora
                        dokonywane metodami określonymi w pkt. 3 powyżej
                        obsługiwane przez Procesorów Płatności świadczącymi na
                        rzecz Administratora usługi płatnicze jako dostawcy
                        usług płatniczych w rozumieniu ustawy o usługach
                        płatniczych. Warunki świadczenia usług płatniczych przez
                        Procesorów Płatności określają odrębne dokumenty
                        sporządzone przez Procesorów Płatności i udostępnione
                        Użytkownikowi przed dokonaniem płatności.
                    </li>
                    <li>
                        Administrator lub Procesor Płatności może pobierać od
                        Użytkowników dodatkowe opłaty z tych realizacji usługi
                        płatniczej. O wysokości należnej opłaty Użytkownik
                        zostanie poinformowany przed dokonaniem płatności.
                    </li>
                    <li>
                        Administrator nie ponosi odpowiedzialności względem
                        Użytkownika w przypadku niedostępności w danym czasie
                        niektórych lub wszystkich akceptowalnych przez
                        Administratora metod płatności określonych w pkt. 3
                        powyżej.
                    </li>
                </ol> */}

                <div className="textCenter">
                    <h3 className="themecolor biglabel">§7 Procedury bezpieczeństwa finansowego</h3>
                </div>

                <ol>
                    <li>
                        Administrator może w każdym czasie trwania Stosunków
                        Gospodarczych, w tym w szczególności przed zawarciem
                        Umowy, żądać od Użytkownika w celu zapewnienia zgodności
                        świadczonych Usług z rzeczywistym zamiarem Użytkownika
                        oraz w celu wypełnienia nałożonych na Administratora
                        obowiązków wynikających z Ustawy:
                        <ol className="alphabetical">
                            <li>
                                potwierdzenia zlecenia Usługi, w tym odrębnej
                                autoryzacji przy wykorzystaniu danych
                                identyfikacyjnych Użytkownika,
                            </li>
                            <li>
                                wskazania dodatkowych danych i informacji celem
                                potwierdzenia tożsamości Użytkownika,
                            </li>
                            <li>
                                dokumentów potwierdzających tożsamość
                                Użytkownika,
                            </li>
                            <li>
                                wskazania celu korzystania z Usługi i dokumentów
                                go potwierdzających,
                            </li>
                            <li>
                                informacji o źródle pochodzenia wartości
                                majątkowych wykorzystywanych w ramach
                                korzystania z Usług i dokumentów je
                                potwierdzających.
                            </li>
                        </ol>
                    </li>
                    <li>
                        Administrator będzie uprawniony do wypowiedzenia
                        Stosunku Gospodarczego ze skutkiem natychmiastowym w
                        przypadku:
                        <ol className="alphabetical">
                            <li>
                                braku możliwości weryfikacji tożsamości
                                Użytkownika zgodnie z §5 ust. 3-7 Regulaminu,{" "}
                            </li>
                            <li>
                                powzięcia uzasadnionej wątpliwości co do
                                prawdziwości, autentyczności lub kompletności
                                wskazanych przez Użytkownika danych
                                identyfikujących lub dokumentów wykorzystanych
                                do ich weryfikacji,
                            </li>
                            <li>
                                odmowy Użytkownika wykonania czynności
                                określonych w ustępie poprzedzającym na wezwanie
                                Administratora albo braku odpowiedzi na takie
                                wezwanie w ciągu 14 dni,
                            </li>
                            <li>
                                powzięcia uzasadnionego podejrzenia
                                wykorzystywania Serwisu przez Użytkownika w celu
                                niezgodnym z bezwzględnie obowiązującymi
                                przepisami prawa obowiązującymi w
                                Rzeczypospolitej Polskiej, a w szczególności w
                                celu popełnienia, usiłowania popełnienia lub
                                pomocnictwa w popełnieniu przestępstwa
                                określonego w art. 299, 165a, Rozdziałach
                                XXXV-XXXVI ustawy – kodeks karny,
                            </li>
                            <li>
                                powzięcia uzasadnionego podejrzenia korzystania
                                z Serwisu w ramach jednego konta Użytkownika
                                przez osoby nieuprawnione,
                            </li>
                            <li>
                                uzyskania w sposób nieuprawniony dostępu do
                                danych Użytkownika umożliwiających logowanie do
                                Serwisu przez osoby trzecie.
                            </li>
                        </ol>
                    </li>
                    <li>
                        Serwis nie żąda od Użytkowników ani nie przechowuje
                        kluczy prywatnych do portfeli wirtualnych Użytkowników
                        służących do przechowywania Walut Wirtualnych.
                    </li>
                </ol>

                <div className="textCenter">
                    <h3 className="themecolor biglabel">§8 Wyłączenie odpowiedzialności</h3>
                </div>

                <ol>
                    <li>
                        Administrator oświadcza, iż nie ponosi
                        odpowiedzialności:
                        <ol className="alphabetical">
                            <li>
                                za szkody powstałe w trakcie lub w związku z
                                korzystaniem z Serwisu wynikające z siły
                                wyższej,
                            </li>
                            <li>
                                za niewykonanie lub nienależyte wykonanie Usługi
                                będące następstwem niezgodnego z Regulaminem lub
                                prawem działania Użytkownika, a w szczególności
                                posłużenia się przez niego danymi osobowymi
                                innej osoby lub wskazanie rachunku bankowego,
                                którego nie jest posiadaczem lub adresu portfela
                                wirtualnego służącego do przechowywania Walut
                                Wirtualnych, do którego nie ma dostępu,
                            </li>
                            <li>
                                za następstwa niewykonania lub nienależytego
                                wykonania zobowiązań powstałych między
                                Użytkownikami Serwisu,
                            </li>
                            <li>
                                za korzystanie z Serwisu w sposób niezgodny z
                                Regulaminem, niezgodny z jego przeznaczeniem lub
                                niezgodny z przepisami prawa,
                            </li>
                            <li>
                                za niekorzystne rozporządzenie środkami
                                prowadzące do ich częściowej lub całkowitej
                                utraty w związku z podjęciem współpracy przez
                                Użytkownika z jakimkolwiek zewnętrznym podmiotem
                                w zakresie doradztwa lub pośrednictwa
                                inwestycyjnego,
                            </li>
                            <li>
                                za niewykonanie lub nienależyte wykonanie
                                Usługi, za które odpowiedzialność ponosi
                                Użytkownik,
                            </li>
                            <li>
                                za niewykonanie lub nienależyte wykonanie Usługi
                                w związku z działaniem lub zaniechaniem osób
                                trzecich, w tym w szczególności Procesora
                                płatności lub organów państwowych,
                            </li>
                            <li>
                                za brak dostępu do Serwisu wynikający z przerw w
                                dostawie na rzecz Administratora usług od
                                podmiotów zewnętrznych, w tym zwłaszcza usług
                                technicznych, elektronicznych,
                                telekomunikacyjnych, bankowych lub płatniczych,
                                które są związane z działaniem funkcji Serwisu,
                            </li>
                            <li>
                                za brak dostępu do Serwisu w sytuacjach
                                określonych w §4 pkt 5-6 Regulaminu,
                            </li>
                            <li>
                                błąd w zakresie wprowadzenie przez Użytkownika
                                danych w formularzu zamówienia dotyczącego
                                wolumenu kupna lub sprzedaży Waluty Wirtualnej,
                            </li>
                            <li>
                                za zmianę wartości nabytych lub sprzedanych
                                Walut Wirtualnych po wykonaniu Usługi Wymiany,
                            </li>
                            <li>
                                za utratę dostępu do posiadanych przez
                                Użytkownika Walut Wirtualnych przelanych przez
                                Administratora na wskazany przez Użytkownika
                                zewnętrzny portfel wirtualny, do którego
                                Użytkownik nie ma lub utracił dostęp.
                            </li>
                        </ol>
                    </li>
                    <li>
                        Użytkownik korzysta z Serwisu na własne ryzyko, co nie
                        wyłącza ani nie ogranicza odpowiedzialności Serwisu,
                        związanej ze świadczeniem Usług lub Innych Usług w
                        zakresie, w którym z mocy prawa nie może ona podlegać
                        wyłączeniu ani ograniczeniu.
                    </li>
                </ol>

                <div className="textCenter">
                    <h3 className="themecolor biglabel">§9 Postępowanie reklamacyjne</h3>
                </div>

                <ol>
                    <li>
                        W razie zaistnienia sytuacji, w której zdaniem
                        Użytkownika lub Użytkownika Demo dojdzie do świadczenia
                        Usługi lub Innej Usługi Serwisu w sposób niezgodny z
                        postanowieniami Regulaminu, ma on prawo do złożenia
                        reklamacji.
                    </li>
                    <li>
                        Udzielenie prawa do Reklamacji jest dobrowolnym
                        działaniem Administratora Serwisu i nie stanowi
                        realizacji gwarancji w rozumieniu ustawy - kodeks
                        cywilny.
                    </li>
                    <li>
                        W celu skorzystania z reklamacji, Użytkownik musi
                        dokonać zgłoszenia reklamacyjnego drogą elektroniczną na
                        adres info@kryptowaluty.pl lub pocztą tradycyjną na
                        adres siedziby Administratora wskazany w §1 Regulaminu.
                    </li>
                    <li>
                        Reklamacja powinna być sporządzona w języku polskim i
                        zawierać:
                        <ol className="alphabetical">
                            <li>
                                dane osobowe wykorzystane w trakcie Rejestracji
                                w Serwisie umożliwiające identyfikację osoby
                                składającej reklamację,{" "}
                            </li>
                            <li>przedmiot reklamacji,</li>
                            <li>
                                okoliczności uprawdopodabniające zasadność
                                złożonej reklamacji,
                            </li>
                            <li>propozycje sposobu załatwienia reklamacji.</li>
                        </ol>
                    </li>
                    <li>
                        Administrator Serwisu zobowiązuje się do odpowiedzi na
                        reklamację niezwłocznie, nie później niż w przeciągu 30
                        dni.
                    </li>
                    <li>
                        W przypadku zasadności zgłoszonej reklamacji, zgłoszenie
                        reklamacyjne zostaje zakończone propozycją rozwiązania
                        przedmiotu reklamacji złożoną Użytkownikowi przez
                        Administratora.
                    </li>
                </ol>

                <div className="textCenter">
                    <h3 className="themecolor biglabel">
                        §10 Odstąpienie od Umowy. Wypowiedzenie Stosunków
                        Gospodarczych.
                    </h3>
                </div>

                <ol>
                    <li>
                        W zakresie świadczenia Usług określonych w §2 pkt. 6
                        ppkt. a) – c) Regulaminu Użytkownikowi nie przysługuje
                        prawo do odstąpienia od Umowy na podstawie art. 27
                        ustawy z dnia 30 maja 2014 r. o prawach konsumentach
                        zgodnie z art. 38 pkt 2 ww. ustawy.
                    </li>
                    <li>
                        W zakresie świadczenia Usługi, o której mowa w §2 pkt. 6
                        ppkt. d) Regulaminu Użytkownikowi przysługuje prawo do
                        odstąpienia od Umowy w tym zakresie w terminie 14 dni od
                        dnia zawarcia Umowy. Odstąpienie od Umowy możliwe jest
                        poprzez wysłanie oświadczenia o odstąpieniu na adres
                        Administratora wskazany w §1 Regulaminu lub złożenie
                        oświadczenia drogą elektroniczną poprzez przesłanie go
                        na adres elektronicznej skrzynki pocztowej
                        Administratora: support@kryptowaluty.pl. Do zachowania
                        terminu do odstąpienia od Umowy wystarczające jest
                        wysłanie w tym czasie oświadczenia o odstąpieniu.
                        Oświadczenie o odstąpieniu może być złożone w
                        szczególności przy wykorzystaniu wzoru stanowiącego
                        załącznik nr 1 do Regulaminu. Świadczenie Usługi, o
                        której mowa w §2 pkt. 6 ppkt. d) Regulaminu rozpocznie
                        się po upływie okresu do odstąpienia od Umowy.
                    </li>
                    <li>
                        Użytkownik może żądać rozpoczęcia świadczenia Usługi, o
                        której mowa w pkt. 2 powyżej, przed upływem terminu do
                        odstąpienia od Umowy w zakresie tej Usługi, przy czym w
                        takim przypadku prawo do odstąpienia od Umowy nie
                        przysługuje zgodnie z art. 38 pkt 13 ustawy z dnia 30
                        maja 2014 r. o prawach konsumentach.
                    </li>
                    <li>
                        Użytkownik może wypowiedzieć Stosunki Gospodarcze z
                        Administratorem w każdym czasie. Oświadczenie o
                        wypowiedzeniu winno być złożone poprzez wysłanie
                        oświadczenia o odstąpieniu na adres Administratora
                        wskazany w §1 Regulaminu lub złożenie oświadczenia drogą
                        elektroniczną poprzez przesłanie go na adres
                        elektronicznej skrzynki pocztowej Administratora:
                        support@kryptowaluty.pl. Wypowiedzenie staje się
                        skuteczne w terminie 7 dni od momentu otrzymania go
                        przez Administratora. W tym samym terminie Administrator
                        usunie konto Użytkownika w Serwisie i zaprzestanie
                        dostarczania Użytkownikowi możliwości skorzystania z
                        Usług oferowanych w Serwisie.
                    </li>
                    <li>
                        Administrator może wypowiedzieć Użytkownikowi Stosunek
                        Gospodarczy w przypadkach wskazanych w Regulaminie i
                        bezwzględnie obowiązujących przepisach prawa.
                        Administrator wypowiada Stosunek Gospodarczy poprzez
                        złożenie oświadczenia w drodze komunikatu w koncie
                        Użytkownika w Serwisie lub poprzez przesłanie wiadomości
                        na adres elektronicznej skrzynki pocztowej Użytkownika
                        wskazany w Serwisie.
                    </li>
                    <li>
                        Wypowiedzenie Stosunku Gospodarczego nie wpływa na
                        ważność Umów wykonanych do czasu ustania Stosunku
                        Gospodarczego.
                    </li>
                    <li>
                        W przypadku posiadania przez Użytkownika na dzień
                        ustania Stosunku Gospodarczego Walut Wirtualnych w
                        Portfelu lub przysługiwania mu od Administratora
                        roszczenia o zapłatę środków wskazanych w Portfelu,
                        Administrator dokona w terminie 3 dni roboczych
                        przelania wolumenu Walut Wirtualnych na wskazany przez
                        Użytkownika zewnętrzny w stosunku do Serwisu portfel
                        służących do ich przechowywania lub wypłaty środków na
                        rachunek płatniczy Użytkownika wskazany w Serwisie. W
                        przypadku posiadania przez Użytkownika więcej niż
                        jednego zweryfikowanego rachunku płatniczego w Serwisie,
                        Użytkownik zobowiązany jest do wskazania właściwego
                        rachunku. Wypłata środków może nastąpić wyłącznie na
                        rachunek prowadzony na rzecz Użytkownika. Administrator
                        nie ponosi odpowiedzialności za opóźnienie w wypłacie
                        lub przelewie Walut Wirtualnych wynikające z
                        niewskazania przez Użytkownika właściwego portfela
                        wirtualnego lub rachunku płatniczego.
                    </li>
                    <li>
                        Wypowiedzenie Stosunku Gospodarczego przez
                        Administratora z przyczyn wskazanych w §3 pkt. 18 lub §6
                        pkt. 2 ppkt. a)-e) Regulaminu skutkuje pozbawieniem
                        Użytkownika możliwości ponownej Rejestracji w Serwisie.
                    </li>
                    <li>
                        Użytkownik Demo oraz Administrator mogą wypowiedzieć
                        łączący ich stosunek prawny w każdym czasie ze skutkiem
                        natychmiastowym w sposób określony w pkt. 4 zd. 2
                        powyżej.
                    </li>
                </ol>

                <div className="textCenter">
                    <h3 className="themecolor biglabel">§11 Postanowienia końcowe</h3>
                </div>

                <ol>
                    <li>
                        Administratorem danych Użytkowników jest Administrator.
                        Podstawy oraz cele przetwarzania danych jak i
                        uprawnienia Użytkowników określone są szczegółowo w
                        Polityce Prywatności dostępnej w Serwisie.
                    </li>
                    <li>
                        Wszelkie spory związane z zawarciem lub wykonaniem
                        Umowy, której przedmiotem są Usługi lub Inne Usługi będą
                        w pierwszej kolejności rozstrzygane przez strony
                        polubownie, w tym przy wykorzystaniu postępowania
                        reklamacyjnego. W razie bezskuteczności polubownego
                        rozwiązania sporu, sądem właściwym dla jego
                        rozstrzygnięcia będzie sąd właściwy miejscowo dla
                        siedziby Administratora.
                    </li>
                    <li>
                        Umowy zawierane pomiędzy Administratorem a Serwisem w
                        zakresie świadczenia Usług lub Innych Usług podlegają
                        wyłącznie prawu polskiemu.
                    </li>
                    <li>
                        Administrator uprawniony jest do jednostronnej zmiany
                        Regulaminu. Regulamin obowiązuje w zmienionym brzmieniu
                        od dnia następującego po dniu, w którym zmieniony
                        Regulamin został opublikowany w Serwisie. Administrator
                        zawiadamia Użytkowników o zmianie Regulaminu poprzez
                        komunikat w Serwisie lub wiadomość wysłaną na adres
                        elektronicznej skrzynki pocztowej Użytkownika wskazany w
                        Serwisie.
                    </li>
                    <li>
                        W razie pojawienia się jakichkolwiek wątpliwości
                        dotyczących postanowień Regulaminu lub działalności
                        Serwisu wszelkie pytania należy kierować na adres:{" "}
                        <a href="mailto:info@kryptowaluty.pl">
                            info@kryptowaluty.pl
                        </a>
                        .
                    </li>
                </ol>

                <div className="textCenter getPdfTerms">
                    <h3 className="themecolor biglabel">Pobierz regulamin w formacie PDF</h3>
                    <Button href={"/files/Kryptowaluty-Regulamin.pdf"}>
                        {i18next.t("Pobierz")}
                    </Button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TermsPage;
