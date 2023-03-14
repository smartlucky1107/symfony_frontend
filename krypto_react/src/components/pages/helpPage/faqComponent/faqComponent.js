import React from "react";
import "./faqComponent.scss";
import FaqElement from "./faqElement/faqElement";
import i18next from "i18next";

const FaqComponent = () => {
    return (
        <div className={"faqComponent"}>
            <h1>{i18next.t("Najczęściej zadawane pytania")}</h1>
            <FaqElement title={i18next.t("Jak kupić kryptowaluty?")}>
                <p>
                    {i18next.t(
                        "Do zakupu kryptowalut potrzebujesz zweryfikowanego konta na platformie. Kolejnym krok to wybranie waluty wirtualnej w panelu oraz wpisanie kwoty, którą pragniemy przeznaczyć na zakup. System automatycznie wyświetli propozycję wymiany danej kryptowaluty po najkorzystniejszym kursie. Następnie musisz wybrać metodę płatności. Możesz zdecydować się na opłacenie transakcji kartą płatniczą lub środkami zgromadzonymi na portfelu wewnętrznym. To wszystko! W ciągu kilku minut transakcja zostanie potwierdzona, a zakupione kryptowaluty wpłyną błyskawicznie na Twój portfel!"
                    )}
                </p>
            </FaqElement>

            <FaqElement title={i18next.t("Jak sprzedać kryptowaluty?")}>
                <p>
                    {i18next.t(
                        "Do sprzedaży walut wirtualnych potrzebujesz w pełni zweryfikowanego konta na platformie. Następnie wybierz kryptowalutę, którą masz zamiar wymienić. Zaznacz walutę fiducjarną z rozwijanej listy w panelu po prawej stronie. Wpisz liczbę wymienianych coinów lub kwotę pieniędzy, za jaką chcesz sprzedać kryptowaluty. System automatycznie wyświetli najkorzystniejszy kurs wymiany. Po zatwierdzeniu sprzedaży wybierz sposób wypłaty. W ciągu kilku minut transakcja zostanie potwierdzona, a środki przetransferowane na Twoje konto bankowe."
                    )}
                </p>
            </FaqElement>

            {/* <FaqElement
                title={i18next.t("Jak odebrać kryptowaluty kupione w sklepie?")}
            >
                In posuere nulla erat, non ultrices tortor aliquet at. Sed
                varius, nulla eget condimentum accumsan, dolor mi blandit diam,
                eget accumsan erat felis placerat est. Nam bibendum vitae ligula
                iaculis blandit. Proin et ligula ac tellus ultricies hendrerit.
                Vestibulum id interdum mi, at dapibus ligula. Curabitur nec
                ultrices est. Quisque quis ipsum sagittis, suscipit quam non,
                posuere nisl. Pellentesque nec leo tellus. Nam volutpat semper
                aliquam. Quisque sed nunc mauris. Donec ornare fringilla mattis.
            </FaqElement> */}

            <FaqElement
                title={i18next.t(
                    "Dlaczego jest limit wpłat depozytu maksymalnie do 8500 PLN?"
                )}
            >
                <p>
                    {i18next.t("Działając zgodnie z wytycznymi MIP (źródło")}:{" "}
                    <a
                        href="https://www.knf.gov.pl/dla_rynku/procesy_licencyjne/platniczy/MIP/Dzialalnosc_MIP"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {i18next.t("KNF")}
                    </a>{" "}
                    {i18next.t(
                        ") wprowadzamy dla wszystkich użytkowników limit maksymalnej wartości depozytu 8500 PLN. Oznacza to, że w żadnym momencie na koncie wartość wpłaconych do nas walut FIAT (PLN, USD, EUR, GBP) nie może przekroczyć w sumie określonego limitu. Pamiętaj o tym, że chodzi tu tylko o wartość wpłaconych środków, nie ma limitów posiadanych środków np. z transakcji KRYPTO - PLN te środki przechowywane są na innym bilansie. Nie ma również limitu zakupu za pomocą karty kredytowej"
                    )}
                </p>

                <p>
                    {i18next.t("Przykład")} 1:{" "}
                    {i18next.t(
                        "Stefan ma wpłacone na bilansie depozytowym 8000 PLN, chce dopłacić jeszcze 2000 PLN, by móc zakupić za 10000 PLN kryptowalutę BTC. System uniemożliwi taką transakcje ponieważ przekracza limit depozytu 8500 PLN."
                    )}
                </p>
                <p>
                    {i18next.t("Przykład")} 2:{" "}
                    {i18next.t(
                        "Stefan posiada na koncie 8000 PLN z wymiany BTC na PLN i chce wpłacić 2000 PLN, by móc zakupić za 10000 PLN kryptowalutę BTC. System umożliwi wpłatę ponieważ na koncie depozytowym wartość wpłat przez transakcją jest równa 0."
                    )}
                </p>
            </FaqElement>

            <FaqElement
                title={i18next.t(
                    "Kiedy wpłata zostanie dodana do mojego konta?"
                )}
            >
                <p>
                    {i18next.t(
                        "Dokonywanie wpłat kryptowalut oraz depozytów PLN, EUR, GBP oraz USD zwykłymi przelewami bankowymi jest darmowe. Informacje na temat czasu zaksięgowania środków na Twoim koncie w serwisie są zależne od kilku czynników"
                    )}
                    :
                </p>
                <ol>
                    <li>
                        {i18next.t(
                            "księgowania wpłat na koncie w naszym serwisie (wpłaty księgujemy w dni robocze 2 razy dziennie o 11 i 17)"
                        )}
                    </li>
                    <li>
                        {i18next.t(
                            "księgowanie wypłaty z konta w banku wychodzącym zależy od sesji tego banku i rodzaju przelewu. Pamiętaj - przelew międzywalutowy z przewalutowaniem może księgować się nawet kilka dni."
                        )}
                    </li>
                    <li>
                        {i18next.t(
                            "Wpłaty kryptowalut dopisywane są do kont użytkowników po otrzymaniu różnej ilości potwierdzeń z sieci - zazwyczaj zajmuje to kilka minut, maksymalnie może to trwać do 30 minut."
                        )}
                    </li>
                </ol>
            </FaqElement>

            <FaqElement
                title={i18next.t(
                    "Dlaczego wypłata zmniejsza wartość depozytu, a nie salda portfela wewnętrznego?"
                )}
            >
                <p>
                    {i18next.t(
                        "Podczas robienia zakupów Kryptowalut lub tworzenia wypłaty środków z portfela FIAT (PLN, USD, EUR lub GBP) wszystkie transakcje realizowane są najpierw z bilansu depozytowego, a w drugiej kolejności z bilansu wewnętrznego. Celem takiego postępowania jest umożliwienie nowych wpłat na konto depozytowe w przyszłości oraz działanie zgodne z zasadami MIP (limit wpłat depozytowych)."
                    )}
                </p>
            </FaqElement>

            <FaqElement title={i18next.t("Czym są kryptowaluty?")}>
                <p>
                    {i18next.t(
                        "Kryptowaluty nazywane są inaczej walutami wirtualnymi bądź walutami cyfrowymi i pełnią funkcję wirtualnego pieniądza. Nie mają one materialnej formy. Kryptowaluty nie podlegają kontroli przez rządy czy banki centralne w przeciwieństwie do walut fiducjarnych."
                    )}
                </p>

                <p>
                    {i18next.t(
                        "Swoją specyfikę w działaniu opiera na specjalistycznej kryptografii. Waluty wirtualne używane są do sfinansowania wszelkich transakcji internetowych, które charakteryzują się zabezpieczeniami, szybkością i transparentnością. Dzięki kryptografii możliwe jest zapewnienie bezpieczeństwa transakcjom dokonywanych przez użytkowników."
                    )}
                     
                </p>
                <p>
                    {i18next.t(
                        "Aktualnie odnotowuje się liczbę ponad tysiąca kryptowalut, a każda z nich posiada inną wartość. Warto wspomnieć, że wartości walut wirtualnych podatne są na znaczne wahania, dlatego też dla wielu osób nie jest to waluta wiarygodna dla określenia płatności. Czym jest Bitcoin?"
                    )}
                </p>
            </FaqElement>

            <FaqElement title={i18next.t("Czym jest Bitcoin?")}>
                <p>
                    {i18next.t(
                        "Jest to pierwsza kryptowaluta, zwana inaczej walutą cyfrową, która funkcjonuje w zdecentralizowanej sieci. Za jego koncepcją stoi anonimowa osoba lub grupa osób znana pod pseudonimem Satoshi Nakamoto. Bitcoin nie ma formy materialnej, a jego ilość jest ograniczona do 21 mln. Celem stworzenia Bitcoina było utworzenie alternatywnego systemu płatności - niezależnego od banków i rządów."
                    )}
                </p>
            </FaqElement>

            <FaqElement title={i18next.t("Co wyróżnia Bitcoina?")}>
                <p>
                    {i18next.t(
                        "Bitcoin nazywany jest „cyfrowym złotem”, ale czy faktycznie warto inwestować w tę kryptowalutę? Zdecydowanie tak! Bitcoin nie jest kontrolowany przez rządy ani banki centralne - jest zdecentralizowany. Każdy uczestnik sieci może zobaczyć rejestr transakcji przeprowadzonych z użyciem tej kryptowaluty na blockchainie. Ilość Bitcoinów jest ograniczona do 21 mln, dlatego ryzyko inflacji lub deflacji jest mniejsze w porównaniu do standardowych walut fiducjarnych."
                    )}
                </p>
            </FaqElement>

            <FaqElement title={i18next.t("Gdzie można kupić Bitcoina?")}>
                <p>
                    {i18next.t(
                        "Dokonaj zakupu Bitcoina w kantorze online kryptowaluty.pl bądź w punktach stacjonarnych obsługiwanych przez naszą technologię. Tę najpopularniejszą kryptowalutę możesz również nabyć na giełdach kryptowalutowych, bezpośrednio od innego posiadacza tej waluty wirtualnej lub poprzez kopanie kryptowaluty (mining)."
                    )}
                </p>
            </FaqElement>
            <FaqElement title={i18next.t("Jak zarabiać na Bitcoinie?")}>
                <p>
                    {i18next.t(
                        "Wielu początkujących inwestorów zadaje pytanie, czy tak naprawdę jest jeszcze możliwy zarobek na tej najpopularniejszej kryptowalucie Bitcoin. Jego zmiana w czasie spowodowała, że kilka lat temu inwestowanie było jak najbardziej opłacalne, ze względu na to, iż jego wartość nie była tak duża jak dziś. Zarabianie na kryptowalutach jest możliwe, gdy kursy kryptowalut są niskie i możemy w niedługim czasie liczyć na ich wzrost."
                    )}
                </p>
                <p>
                    {i18next.t(
                        "Warunkiem zarobku na Bitcoinie jest możliwość przewidywania przyszłego kursy walut, a także doświadczenie w spekulacji kursów. Istotne jest ciągłe monitorowanie zmian Bitcoina w celu ustalenia jego potencjalnych przyszłych korzyści.  Zarabiać Bitcoin można w sposób prosty poprzez kupno i sprzedaż z zyskiem. Tutaj niezbędne jest czuwanie nad zmianami kursu i decydowanie o tym, który kurs wydaje się dla nas atrakcyjny do kupna. Nasz zysk będzie oscylował w przypadku jego sprzedaży przy większym kursie niż został zakupiony."
                    )}
                </p>
                <p>
                    {i18next.t(
                        "Dodatkowo na Bitcoinach można zarobić za pośrednictwem kontraktów CFD (ang. contract for difference), które polegają na spekulowaniu o przyszłych zmianach wartości. Zysk będzie zależy od różnicy przy kupnie, a finalnej sprzedaży."
                    )}
                </p>
            </FaqElement>
            <FaqElement title={i18next.t("Bitcoin - jak zacząć?")}>
                <p>
                    {i18next.t(
                        "Społeczność fanów Bitcoina ciągle się powiększa! Inwestycją w tę najpopularniejszą kryptowalutę jest zainteresowana coraz większa rzesza ludzi. Jednak wielu potencjalnych inwestorów nie wie jak rozpocząć swoją przygodę z inwestowaniem w Bitcoina."
                    )}
                </p>
                <p>
                    {i18next.t(
                        "Do pierwszego zakupu Bitcoina będziesz potrzebował jedynie w pełni zweryfikowanego konta na platformie Kryptowaluty.pl."
                    )}
                </p>
                <p>
                    {i18next.t(
                        "Obserwujemy coraz większe zainteresowanie inwestycjami w tę kryptowalutę. Przemawiają za tym różne czynniki. Ludzie tracą zaufanie do rządu czy tradycyjnej bankowości. Wielu potencjalnych inwestorów, jednak nie wie jak rozpocząć swoją przygodę z inwestowaniem w Bitcoina. Opanowanie pewnych zasad Bitcoina okazuje się łatwe."
                    )}
                </p>
                <p>
                    {i18next.t(
                        "Dla osób początkujących przydadzą się pewne porady bezpieczeństwa dotyczącego korzystania z Internetu. Jako, że kryptowaluta istnieje w formie wirtualnej to należy przede wszystkim zadbać o bezpieczeństwo i gwarancję pewności platform, na które mamy dostęp. Ewentualne podejrzane linki czy maile, powinny wzbudzać od razu przekonanie, że istnieje podejrzenie popełnienia oszustwa czy dokonania ataku hakerskiego."
                    )}
                </p>
                <p>
                    {i18next.t(
                        "Dodatkowo, warto zapoznać się z możliwymi atakami kradzieży Bitcoinów, które są często stosowane w manipulowaniu właścicieli kryptowalut. Podstawowym i niezbędnym punktem, jest poświęcenie własnego czasu na dobycie wiedzy na temat tego, czym tak naprawdę są kryptowaluty, a przede wszystkim – czym jest Bitcoin i poznać jego techniczne elementy funkcjonowania. Kolejnym punktem, który jest bardzo istostny to portfel kryptowalut. W zależności od naszych potrzeb oraz zaawansowania, podejmiemy decyzję o najlepszym wyborze portfela, jednak dla osób początkujących idealnie sprawdzi się portfel sprzętowy, który gwarantuje wysokie bezpieczeństwo ochrony naszej kryptowaluty, a także cechuje go łatwość i wygoda w użytkowaniu."
                    )}
                </p>
            </FaqElement>
        </div>
    );
};

export default FaqComponent;
