# kryptowaluty.pl Frontend

## Spis treści

1. [Ogólna struktura aplikacji](#ogolna-struktura-aplikacji)
2. [Rejestracja](#Rejestracja)
    1. [Rejestracja indywidualna](#rejestracja-indywidualna])
    2. [Rejestracja firma](#rejestracja-firmy)
3. [Logowanie](#Logowanie)
4. [Panel użytkownika](#Panel-użytkownika)
    1. [Widok powitalny](#widok-powitalny)
    2. [Weryfikacja](#weryfikacja)
        1. [Weryfikacja użytkownia indywidualnego](#weryfikacja-użytkownia-indywidualnego)
            1. [Krok pierwszy](#krok-pierwszy)
            2. [Krok drugi](#krok-drugi)
            3. [Krok trzeci](#krok-trzeci)
        2. [Weryfikacja użytkownia biznesowego](#weryfikacja-użytkownia-biznesowego)
    3. [Portfele](#portfele)
    4. [Portfele - widok szczegółowy](#portfele-widok-szczegółowy)
        1. [Wpłać środki](#wpłać-środki)
        2. [Wypłać środki](#wyplac-srodki)
        3. [Przekaz wewnętrzny](#przekaz-wewnetrzny)
    5. [Historia transakcji](#historia-transakcji)
        1. [Transakcje](#transakcje)
        2. [Transakcje z portfela](#transakcje-z-portfela)
    6. [Karty płatnicze](#karty-płatnicze)
    7. [Workspace](#workspace)
        1. [Formularz rejestracji workspace](#formularz-rejestracji-workspace)
        2. [POS](#pos)
        3. [Pracownk - widok szczegółowy](#pracownik-widok-szczegółowy)
        4. [Dane firmy](#dane-firmy)
        5. [Transakcje POS](#transakcje-pos)
    8. [Program poleceń](#program-poleceń)
    9. [Ustawienia](#ustawienia)
5. [Context Providery](#context-providery)
    1. [appContext](#appContext)
    2. [userContext](#userContext)
    3. [transactionContext](#transactionContext)
6. [Transakcja](#transakcja) (dokładny opis flow transakcji)
    1. [buyTransaction](#buyTransaction)
    2. [selectCryptocurrency](#selectCryptocurrency)
    3. [selectTransactionType](#selectTransactionType)
    4. [transactionSummary](#transactionSummary)
    5. [transactionCompleted](#transactionCompleted)
7. [Routing](#routing)
8. [UI](#ui)
    1. [BoxPlaceholder].(#BoxPlaceholder)
    2. [Button].(#Button)
    3. [CustomList].(#CustomList)
    4. [ErrorBox].(#ErrorBox)
    5. [FlexTable].(#FlexTable)
    6. [Infobox].(#Infobox)
    7. [Input].(#Input)
    8. [InputCopyFrom].(#InputCopyFrom)
    9. [Loader].(#Loader)
    10. [ModuleUnderMaintenance].(#ModuleUnderMaintenance)
    11. [Pagination].(#Pagination)
    12. [Popup].(#Popup)
    13. [Preloader].(#Preloader)
    14. [ProgressBar].(#ProgressBar)
    15. [Roundicon].(#Roundicon)
    16. [Search].(#Search)
    17. [SearchByApi].(#SearchByApi)
    18. [Select].(#Select)
    19. [SuccessThumbUp].(#SuccessThumbUp)
    20. [Tabs].(#Tabs)
    21. [Textarea].(#Textarea)
    22. [TimeBar].(#TimeBar)
    23. [Tooltip].(#Tooltip)
    24. [TransactionStatusIcons].(#TransactionStatusIcons)
    25. [UnderHeader].(#UnderHeader)
    26. [UserBox].(#UserBox)

## Ogólna struktura aplikacji

Podział stron

-   Strona główna `https://kryptowaluty.pl/`
-   Jak kupować kryptowaluty `https://kryptowaluty.pl/jak-kupic-kryptowaluty`
-   Jak założyć konto `https://kryptowaluty.pl/jak-zalozyc-konto`
-   Jak kupić bitcoin `https://kryptowaluty.pl/jak-kupic-bitcoin`
-   Jak kupić ethereum `https://kryptowaluty.pl/jak-kupic-ethereum`
-   Oferta dla kantorów `https://kryptowaluty.pl/partnerstwo`
-   O nas `https://kryptowaluty.pl/o-nas`
-   Tabla opłat `https://kryptowaluty.pl/tabela-oplat`
-   Regulamin `https://kryptowaluty.pl/regulamin`
-   Polityka prywatności `https://kryptowaluty.pl/polityka-prywatnosci`
-   Pomoc `https://kryptowaluty.pl/pomoc`
-   Kontakt `https://kryptowaluty.pl/kontakt`
-   Kup `https://kryptowaluty.pl/kup`
-   Sprzedaj `https://kryptowaluty.pl/sprzedaj`
-   Dashboard `https://kryptowaluty.pl/dashboard` (tylko dla zalogowanych)
-   -   Weryfikacja konta `https://kryptowaluty.pl/dashboard/weryfikacja`
-   -   Portfele `https://kryptowaluty.pl/dashboard/portfele`
-   -   Historia transakcji `https://kryptowaluty.pl/dashboard/historia`
-   -   Karty płatnicze `https://kryptowaluty.pl/dashboard/paymentcards`
-   -   Workspace `https://kryptowaluty.pl/dashboard/workspace` (tylko dla użytkowników biznesowych)
-   -   Program poleceń `https://kryptowaluty.pl/dashboard/referral`
-   -   Ustawienia `https://kryptowaluty.pl/dashboard/ustawienia`

## Rejestracja

Do rejestracji przechodzimy przez link:<br>
`localhost:3000/zaloz-konto`<br>

Domyślną opcją rejestracji jest utworzenie konta indywidualnego, opcjonalnie można wybrać założenie konta firmowego.

Komponenty odpowiedzialne za proces rejestacji znajdują się `\src\components\pages\registerPage`
KOmponent odpowiedzialny za przełączanie rejestracja indywidualna\firmowa: `\src\components\pages\registerPage\registerTypeSelector`

### Rejestracja indywidualna

KONTROLER WIDOKU: `\src\components\pages\registerPage\registerForm`

Rejestracja obejmuje podanie:
Imienia,
Nazwiska,
Adresu e-mail
Hasła,
Powtórzenia hasło,
Kod polecający (opcjonalnie)

Zaznaczenia zgody:
Zapoznania z regulaminem,
Zapoznania z polityką prywatności,
Zgoda marketingowa (opcionalnie),

Wymagana jest również google captcha.

Po podaniu poprawnych danych użytkownik otrzymuje ekran z prośbą o aktywację po kliknięciu w link z maila.

### Rejestracja firmy

KONTROLER WIDOKU: `\src\components\pages\registerPage\businessRegisterForm`

Rejestracja obejmuje:
Wybranie rodzaju działalności z listy dostępnych

W przypdaku Jednoosobowej Działalności Gospodarczej użytkownik podaje dane jak w przypadku rejestracji indywidualnej
i dodatkowo nip oraz nazwę firmy.

W przypadku innych opcji należy podać:
Nazwę firmy,
NIP,
Adres e-mail,
Kod polecający (opcjonalnie),

Zaznaczenia zgody:
Zapoznania z regulaminem,
Zapoznania z polityką prywatności,
Zgoda marketingowa (opcionalnie),

Po podaniu poprawnych danych użytkownik dostaje informację o weryfikacji przesłanych danych przez support a konto zostanie
aktywowane po poprawnej weryfikacji.

## Logowanie

Do logowania przechodzimy przez link:<br>
`localhost:3000/zaloguj`<br>

KONTROLER WIDOKU: `\src\components\pages\loginPage`

Logowanie obejmuje podanie:
Adresu e-mail,
Hasła,

Wymagana jest również google captcha.

Poprawne logowanie przenosi do panelu użytkownika.

## Panel użytkownika

Widok dostępny tylko dla zalogowanych użytkowaników

LINK: `localhost:3000/dashboard`
KONTROLER WIDOKU: `\src\components\pages\userDashboard`

Panel korzysta z kontekstu do autoryzacji i powbierania danych `UserContext`

### Widok powitalny

LINK: `localhost:3000/dashboard`
KONTROLER WIDOKU: `\src\components\pages\userDashboard\dashboardWelcome`

Widok obejmuje: - skróconą listę portfeli : `WalletsToggleList` - widok rynków wraz z wykresem: `Markets` - skrót danych konta: `AccountData` - skróconą historię transakcji: `TradesHistory` - status weryfokacji konta: `VerificationStatus`

### Weryfikacja

KONTROLER WIDOKU: `DashboardVerification`
LINK: `localhost:3000/dashboard/weryfikacja`

Weryfikacja przebiega 3 etapowo dla użytkownika indywidualnego i poprzez wysłanie maila dla użytkownika biznesowego.

#### Weryfikacja użytkownia indywidualnego

KONTROLER WIDOKU: `VerificationPersonalUser`

W komponencie używane jest ui `ProgressBar`

##### Krok pierwszy

KONTROLER WIDOKU: `VerificationForm`

Do formularza weryfikacyjnego użytkownik podaje:
Imię,
Nazwisko,
Adres zamieszkania,
Numer telefonu,
Datę urodzenia,
Kraj zamieszkania,

Oraz oświadczenie dotyczące PEP (osoby zajmujące eksponowane stanowiska polityczne)

W przypdaku JDG podaje również dane firmy.

##### Krok drugi

Po poprwanie przesłanym formularzu użytkownik przechodzi do weryfikacji JUMIO (Zewnętrzny dostawca)

KONTROLER WIDOKU: `VerificationJumio`

Zewnętrzny dostawca weryfikuje tożsamość na podstawie dokumentów oraz selfie.

Po pozytywnym przejściu weryfikacji użytkownik dostaje komunikat `VerificationInProgress`

##### Krok Trzeci

Trzecim etapem jest zatwierdzenie lub odrzucenie przez pracownika.
W przypadku odrzucenia następuje kontakt i użytkownik musi ponownie przejść weryfikację kroku drugiego.

W przypadku zatwierdzenia dostaje komunikat: `VerificationSuccess`

#### Weryfikacja użytkownia biznesowego

KONTROLER WIDOKU: `VerificationBusinessUser`

Weryfikacja odbywa się całkowicie przez support

### Portfele

LINK: `localhost:3000/dashboard/portfele`
KONTROLER WIDOKU: `DashboardWallets`

Widok listy dostępnych portfeli walutowych wraz z wysukiwarką i saldami

Do wyszukiwania używany jest komponent `SearchBar`, wyszukiwanie odbywa się na froncie.
Do generowania listy używany jest komponent `WalletsList`.

### Portfele - widok szczegółowy

LINK: `localhost:3000/dashboard/portfele/{shortName}`
KONTROLER WIDOKU: `DashboardSingleWallet`

Widok składa się z:
Salda dostępnego/zablokowanego
Listy wyboru innego portfela
Kontentu podzielonego na:

-   Wpłać środki `Deposit`,
-   Wypłać środki `Withdrawal`,
-   Przekaz wewnętrzny `InternalTransfer`

#### Wpłać środki

KONTROLER WIDOKU: `Deposit`

Widok posiada podział na:
Depozyty krypto `DepositCrypto`
Depozyty fiat `DepositFiat`

Widok wyświetla historię transakcji z wykorzystaniem komponentu `FlexTable`

#### Wypłać środki

KONTROLER WIDOKU: `Withdrawal`

Widok posiada podział na:
Wypłaty krypto `WithdrawalCrypto`

Wypłata środków zgdomadzonych na portfelu, wypłata odbywa się przez podanie adresu zewnętrznego portfela, wybraniu ilości oraz potwierdzeniu operacji kodem z który przychodzi na adres e-mail

Wypłaty fiat `WithdrawalFiat`

Wypłata środków fiat jest możliwa po wcześniejszej weryfikacji numeru konta bankowego przez support. Proces wypłaty polega na wybraniu z listy numeru konta, podaniu kwoty oraz zatwierdzeniu kodem z wiadomości e-mail

Widok wyświetla historię transakcji z wykorzystaniem komponentu `FlexTable`

#### Przekaz wewnętrzny

KONTROLER WIDOKU: `InternalTransfer`

Przekaz wewnętrzny pozwala na przesłanie kryptowalut pomiędzy użytkownikami serwisu. Do porzesłania potrzebny jest adres e-mail odbiorcy oraz kod potwierdzający z wiadomości e-mail

Widok wyświetla historię transakcji z wykorzystaniem komponentu `FlexTable`

### Historia transakcji

LINK: `localhost:3000/dashboard/historia`
KONTROLER WIDOKU: `DashboardHistory`

Komponent wyświetla historię transakcji z podziałem na transakcje wykonywane z wykorzystaniem procesorów płatności oraz środków zgromadzonych na portfelach.

#### Transakcje

LINK: `localhost:3000/dashboard/historia?checkoutorders`
KONTROLER WIDOKU: `CheckoutOrders`

Transakcje wykonywane z wykorzystaniem procesorów płatności

Nagłówek z przyciskiem generowania historii znajduje się w `CheckoutOrdersTabIntroduce`

Generowanie pliku csv z historią odbywa się w `GenerateHistoryFile`

#### Transakcje z portfela

LINK: `localhost:3000/dashboard/historia?trades`
KONTROLER WIDOKU: `Trades`

Transakcje ze środków zgromadzonych na portfelach.

Nagłówek z przyciskiem generowania historii znajduje się w `TradesTabIntroduce`

Generowanie pliku csv z historią odbywa się w `GenerateHistoryFile`

### Karty płatnicze

LINK: `localhost:3000/dashboard/paymentcards`
KONTROLER WIDOKU: `DashboardPaymentcards`

Dodawanie kart płatniczych które można użyć w procesie transakcji. Kartę można zdezaktywować klikając przycisko na graficznej manifestacji karty. Karty są weryfikowane przez zewnętrznego dostawcę.

### Workspace

LINK: `localhost:3000/dashboard/workspace`
KONTROLER WIDOKU: `DashboardWorkspace`

Opcja dostępna tylko dla użytkowników biznesowych.

#### Formularz rejestracji workspace

KONTROLER WIDOKU: `WorkspaceForm`

Formularz dający użytkownikowi biznesowemu dostęp po przesłaniu danych dotyczących POS.

#### POS

LINK: `localhost:3000/dashboard/workspace?pos`
KONTROLER WIDOKU: `WorkspacePos`

Widok pozwal na instalację lub usunięcie punktu POS na aktualnym urządzeniu.
KONTROLER WIDOKU:`WorkspacePosInstallation`

Widok pozwala na dodawanie pracowników oraz przeglądanie ich listy.
KONTROLER WIDOKU:`WorkspaceWorkers`

#### Pracownik - widok szczegółowy

LINK: `localhost:3000/dashboard/workspace/employee/{id}`
KONTROLER WIDOKU: `DashboardSingleWorker`

W widoku wyświetlane są podstawowe dane pracownika. Możliwość zmiany pinu pracownika oraz możlowość zablokowania pracownika.

Jest również lista z portfeli z saldami.

#### Dane firmy

LINK: `localhost:3000/dashboard/workspace?company`
KONTROLER WIDOKU: `WorkspaceData`

Widok udostępnia dane podane przy rejestracji. Umożliwia zmianę pinu oraz dodanie autoryzacji dwustopniowej.

#### Transakcje POS

LINK: `localhost:3000/dashboard/workspace?transactions`
KONTROLER WIDOKU: `WorkspaceHistory`

Lista z historią wszystkich przeprowadzonych transakcji POS. Po kliknięciu w konkretną transakcję rozwijają się szczegóły.
Listę można firtrowć po dacie i po parze.

### Program poleceń

LINK: `localhost:3000/dashboard/referral`
KONTROLER WIDOKU: `DashboardReferrals`

W widoku użytkownik może wygenerować link z kodem programu poleceń.

Widok posiada również listę wyświetlającą zyski uzyskane z programu poleceń oraz listę aktywnych osób które zarejestrowały się przy użyciu kodu polecającego.

### Ustawienia

LINK: `localhost:3000/dashboard/ustawienia`
KONTROLER WIDOKU: `DashboardSettings`

Widok ustawień pozwala na podgląd danych podanych przy weryfikacji, resetowanie hasła oraz ustawienie autryzacji dwustopniowej.

## Context Providery

### appContext

LOKALIZACJA: `src\components\appContext.js`
Główny kontekst do zapamiętywania danych zalogowanego użytkownika.

### userContext

LOKALIZACJA: `src\components\user\userContext.js`
Przechowuje informacje na temat zalogowanego użytkownika.

### transactionContext

LOKALIZACJA: `\src\components\transaction\transactionContext.js`
Przechowuje wszystkie informacje dotyczące transakcji:<br>

## Transakcja

LOKALIZACJA: `src\components\transaction`

Porces zakupu/sprzedaży kryptowalut. Proces dostępny tylko dla zalogowanych użytkowników.
Płatności można dokonać wybierając zewnętrzny procesor płatności lub środku zgromadzone na portfelu

### Kupno

Strona zakupu krypto
LOKALIZACJA: `src\components\pages\transactionPages\buyTransactionPage`
KONTROLER WIDOKU: `BuyTransactionPage`

#### Wybór metody płatności

LOKALIZACJA: `src\components\transaction\paymentSelector\paymentSelector`
KONTROLER WIDOKU: `PaymentSelector`

#### Inicjacja zakupu

LOKALIZACJA: `src\components\transaction\sliderSellBuy\initialBuyContainer.js`
KONTROLER WIDOKU: `InitialBuyContainer`

#### Finalizacja zakupu

Po finalizacji przenosi na stronę statusu:

ADRES: `/status/{idTransakcji}`
LOKALIZACJA: `src\components\pages\transactionPages\statusTransactionPage\statusTransactionPage.js`
KONTROLER WIDOKU:`StatusTransactionPage`

### Sprzedaż

Strona sprzedaży krypto
LOKALIZACJA: `src\components\pages\transactionPages\sellTransactionPage`
KONTROLER WIDOKU: `SellTransactionPage`

#### Inicjacja sprzedaży

LOKALIZACJA: `src\components\transaction\sliderSellBuy\initialSellContainer.js`
KONTROLER WIDOKU: `InitialSellContainer`

#### Finalizacja sprzedaży

LOKALIZACJA: `src\components\transaction\sellFinalization\sellFinalization.js`
KONTROLER WIDOKU: `SellFinalization`

Po finalizacji przenosi na stronę statusu:

ADRES: `/status/{idTransakcji}`
LOKALIZACJA: `src\components\pages\transactionPages\statusTransactionPage\statusTransactionPage.js`
KONTROLER WIDOKU:`StatusTransactionPage`

## Routing

### routing.js

Zawiera komponent Switch, oraz trzeba ręcznie dodawać routy wedle uznania.

### routingService.js

Zawiera metodę do pobierania pełnego routa, którego path ustala się w tym pliku. Obsługa języka została dodana.

## UI

LOKALIZACJA: `\src\components\ui`

Elementy interfejsu użytkowanika oraz elementy które były wykorzystywane jako meduły.

### BoxPlaceholder

Komponent dodający animowane elementy przed załadowaniem treści z responsów

Propsy <br>

-   type (string) `line walletPlaceholder box bptabs`
-   count (number) - ilość generowanych elementów
-   show (bool) - pokaż/ukryj element

### Button

Przycisk, który może być typu button, link lub element a.

Propsy:<br>

-   type (string) typ przycisku
-   blue (bool) umożliwia ustawienie koloru na niebieski
-   active (bool) nadaje klasę active
-   big (bool) większa wersja przycisku
-   thin (bool) mniejsza wersja przycisku
-   small (bool) mniejsza wersja przycisku
-   prev (bool) przycisk służący do powrotu, cofania
-   disabled (bool) ustawia typ przycisku na disabled
-   leftIcon oraz rightIcon (string) wyświetla ikonkę z Material Icons, np. `leftIcon='hourglass_empty'`
    <br><br>
-   to (string) zmienia przycisk w `<Link to={to}/>` i prowadzi do podanego routa
-   navLink(bool) tylko przy `to` link nawigacji react
-   href (string) zmienia przycisk w `<a href='href'/>`
-   targetBlank (bool) tylko przy `href`
    <br><br>
    onClick(function) funkcja wywoływana po kliknięciu w przycisk

### CustomList

Ostylowana lista której wrtości dzieci przekazywane są jako komponenty niższego rzędu
Komponent niższego rzędu `CustomListItem`

### ErrorBox

Tooltip wyświetlający komunikat o błędach

Propsy:<br>

-   msg(string) treść błędu
-   side(string) strona wyświetlania

### FlexTable

Tablica ostylowana z użyciem flexboxa.

Propsy:<br>

-   tableClass,
-   headItems,
-   bodyItems

### Infobox

Komponent do wyświetlania elementu z tekstem informacyjnym:

HOC Treść przesyłana jako dziecko komponentu

Propsy:<br>

-   animation(string) `wobble slide-in-top`
-   icon(string) nazwa ikony z material icons
-   type(string) `error warning success gray`
-   fontSize(string) `medium big`

### Input

Zwykły input lub checkbox

Propsy:<br>

-   value
-   type - poza standardowymi wspiera rownież 'crypto', 'fiat' oraz 'phone'
-   readOnly
-   label
-   id - WYMAGANE

### InputCopyFrom

Input z którego po kliknięciu zawartość kopiowana jest do schowka

### Loader

Preloader, któremu można nadać label, by wyświetlał podany tekst.

### ModuleUnderMaintenance

Informacja o trwających pracach technicznychd

### Pagination

Moduł do paginacji komunikujący się z api

Propsy:<br>

-   handleBuildList(function) funkcja generująca listę
-   URL(string) api url do pobierania kolejnych stron paginacji
-   setList(objekt) zmienna do przechowywania elementów listy
-   setListPreloader(bool) zmienna do włączania/wyłączania preloadera

### Popup

HOC - jako potomka dodajemy treść jaka ma być w nim wyświetlana

Propsy:<br>

-   handleClosePopup(function) funkcja zamykająca popup
-   ref referencja wskazująca na ten konkretny komponent

Komponent eksportuje również funkcje zarządzania (otwieranie/zamykanie popupu), należy do nich przekazać referencję danego popupu

-   handleShowPopup(popupRef)
-   handleClosePopup(popupRef)

### Preloader

Prosty preloader
Propsy:<br>

-   show(bool) pokaż/ ukryj komponent

### ProgressBar

Komponent do wyświetlania postępów w formie ścieżki.
HOC - jako potomków przyjmuje `ProgressBarPoint`
Propsy:<br>

-   progressLenght

#### ProgressBarPoint

Propsy:<br>

-   pointPositon(number) pozycja na osi wyrażona w liczbie konwertowana do % od lewej
-   startPoint(bool) specjalan klasa i stylowanie dla punktu startowego
-   endPoint(bool) specjalan klasa i stylowanie dla punktu końcowego
-   pointName(string) - Nazwa wyświetlana pod znacznikiem punktu
-   pointColor(string) - zmiana koloru punktu, dostępny `success`
-   pointDesc zostawione na przyszłość, ma wyświetlać opis punktu

### Roundicon

Komponent do dodwania ikon z okrągłym borderem

Propsy:<br>

-   btype(string) rodzaj przycisku
-   active(bool)
-   size(string) `small medium big`
-   to(route) wewnętrzny link w aplikacji
-   href(string) zwenętrzny link
-   icon(string) ikona material icons
-   content(string) opis ikony

### Search

Komponent do wyszukiwania w statycznych elementach

Propsy:<br>

-   filterIn(ref) Ref wskazuje bezpośredniego rodzica filtrowanych elementów
-   filterBy(object) objekty z value i name po których będzie filtrować data-filter
-   id(string) id dla inputa wyszukiwania
-   name(string) name dla inputa wyszukiwania
-   placeholder(string) Placeholder wyświetlany w inpucie

#### Dodać do bezpośredniego potomka filterIn

-   data-search={`${props.name},${props.shortName}`} -- dane po których będzie wyszukiwanie z inputa searchContainer (STRING)
-   data-filter={props.type} -- dodatkowe filtrowanie po -- selectedElement (object {value:0,name: filterBy})

### SearchByApi

Komponent do wyszukiwania z użyciem api

Propsy:<br>

-   handleFilter(function) funkcja która tworzy url z zapytaniem get
-   selectedDateFrom(string) data od której ma być fitrowane
-   setSelectedDateFrom(function) funkcja do aktualizacji wybranej daty
-   selectedDate(string) data do której ma być filtrowane
-   setSelectedDate(function) funkcja do aktualizacji wybranej daty
-   typeList(array) tablica z selektem i dodatkowymi opcjami filtrowania po typie
-   activeType(object) wybrany typ z selekta
-   setActiveType(function) funkcja do wybierania typu
-   pairsList(array) tablica z selektem i dodatkowymi opcjami filtrowania po możliwych parach
-   activePair(object) wybrana prara z selekta
-   setActivePair() funkcja do wybierania pary

### Select

Customowy selekt

Propsy:<br>

-   options(array) tablica obiektów `[{value, name}]`
-   label(string) nazwa pola
-   required(bool) dodaje wybór jako wymagany
-   activeElement(object) aktywny element `{value, name}`
-   onChangeActiveElement(function) funkcja pozwalająca wybrać aktywny element
-   id(string) id elementu custom select

### SuccessThumbUp

Komponent wyświetlający ikonę z kciukiem w górę i przekazaną wiadomością.

Propsy:<br>

-   message(string)

### Tabs

Miał to być ogólny komponent dla wszystkich tabów

### Textarea

Komponent texarea

Propsy:<br>

-   id(string) string z id elementu
-   value(variable) zminna przechowująca wartość elementu
-   required(bool) znacznik czy pole jest wymagane
-   onChange(function) funkcja do zmiany wartości value
-   label(string) nazwa pola

### TimeBar

Komponent wyświetla pasek z graficzną reprezentacją czasu trwania

Propsy:<br>

-   label(string) nazwa elementu
-   ticker(bool) `true` włącza animację `false` zatrzymuje
-   time(number) czas trwania animacji

### Tooltip

Komponent dymków wyśietlający dodatkowe informacje. Komponent powinien być wewnątrz elementu z klasą tooltipWrapper

Propsy:<br>

-   side(string) strona po której ma się wyświetlać komponent `top bottom left right`
-   text(string) treść

### TransactionStatusIcons

Komponent wyświetla ikony wraz z tooltipami opsiującymi statusy zwracane z backendu

Propsy:<br>

-   status(number) kod statusu zwracany z backendu
-   type(string) podział na różne rodzaje bo różnie zwraca backend `pos trade`
-   side(string) strona po której ma być wyświetlany tooltip `top bottom left right`

### UnderHeader

Komponent belki pod menu

Propsy:<br>

-   title(string)
-   description(string)

### UserBox

komponent wyświetlany w dashboard nad nawigacją. Korzysta z userContext

Propsy:<br>

-   to(route) routing wewnątrz aplikacji
