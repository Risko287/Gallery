# Interaktívna Galéria Obrázkov

## Krátky popis

Interaktívna webová aplikácia kombinuje JavaScript, Bootstrap a Google Maps API na zobrazenie interaktívnej galérie obrázkov. Aplikácia načíta dáta o fotografiách z JSON súboru, dynamicky vytvorí galériu obrázkov a umožní používateľom zobraziť si jednotlivé fotografie v modálnom režime. Skript tiež poskytuje funkcie ako prezentácia, vyhľadávanie a zobrazovanie polohy pre každú fotografiu.

## Začíname

1. Naklonujte tento repozitár na svoj počítač.
2. Uistite sa, že máte nastavený webový server na poskytovanie HTML a JavaScript súborov.
3. Uistite sa, že máte v projekte nainštalované potrebné závislosti, vrátane Bootstrap a Google Maps API:

   - Bootstrap CSS: `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet">`
   - Bootstrap JavaScript: `<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>`
   - Google Maps API: `<script async src="https://maps.googleapis.com/maps/api/js?key=VAŠE_API_KĽÚČ&callback=initMap&v=weekly"></script>`

   Nahraďte "VAŠE_API_KĽÚČ" vaším API kľúčom pre Google Maps.

4. Použite poskytnutý CSS štýl pre vylepšenie vizuálneho vzhľadu a rozloženia webovej aplikácie.

5. Otvorte aplikáciu vo svojom prehliadači.

## Použitie

1. Skript načíta dáta o fotografiách zo súboru 'photos.json' po načítaní stránky. Uistite sa, že JSON súbor je k dispozícii v rovnakom adresári ako HTML súbor.
2. Fotografie sú zobrazené v galérii na stránke. Kliknutie na obrázok otvorí modálny režim.
3. V modálnom režime môžete prechádzať medzi fotografiemi pomocou tlačidiel "Predchádzajúci" a "Ďalší".
4. Môžete tiež spustiť prezentáciu všetkých fotografií kliknutím na tlačidlo "Spustiť prezentáciu" a zastaviť ju tlačidlom "STOP".
5. V hornom vyhľadávacom paneli môžete filtrovať fotografie na základe kľúčových slov v ich názvoch alebo popisoch.
6. Každá fotografia je zobrazená na Google Maps. Kliknutím na značku na mape sa otvorí príslušná fotografia v modálnom režime.

## Licencia

Tento projekt je licencovaný pod MIT licenciou. Viac informácií nájdete v súbore [LICENSE](LICENSE).

## Kontakt

Ak máte akékoľvek otázky alebo pripomienky, prosím, kontaktujte nás na [Váš Email].

---

Nahraďte "[Váš Email]" a "VAŠE_API_KĽÚČ" vašimi vlastnými informáciami a API kľúčom pre Google Maps. Tento popis poskytuje stručný prehľad o webovej aplikácii a jej závislostiach, vrátane použitého CSS štýlu.
