# Новое поколение — GitHub Pages release

Готовая статическая сборка сайта. Публичные файлы находятся в `site/`, а публикация выполняется GitHub Actions из `.github/workflows/pages.yml`.

## Публикация

1. Создайте репозиторий на GitHub и загрузите **содержимое этой папки в корень репозитория**.
2. Убедитесь, что основная ветка называется `main`.
3. Откройте **Settings → Pages**.
4. В **Build and deployment → Source** выберите **GitHub Actions**.
5. Сделайте push в `main` или запустите workflow **Deploy to GitHub Pages** вручную во вкладке Actions.
6. После успешного workflow адрес сайта появится в Pages и в карточке deployment.

Ссылки и ресурсы сайта сделаны относительными, поэтому сборка работает как в корневом домене, так и по адресу вида `https://username.github.io/repository/` без ручного изменения `base`.

## Свой домен

Пользовательский домен в эту сборку намеренно не зашит. Его лучше добавить через **Settings → Pages → Custom domain**, когда финальный домен будет известен.

## Структура

- `site/index.html` — главная страница.
- `site/*-movement.html`, `site/*-department.html` — страницы направлений.
- `site/brandbook/index.html` — брендбук.
- `site/assets/` — шрифты и графика.
- `site/.nojekyll` — публикация файлов как статического сайта без обработки Jekyll.
- `.github/workflows/pages.yml` — автоматический деплой в GitHub Pages.
