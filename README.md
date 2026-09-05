# Новое поколение

**Проект создаваемой молодёжной организации и открытой платформы для инициатив, развития и реальных действий.**

> **Не ждать перемен. Создавать их.**

🌐 **Сайт:** https://askuyr.github.io/novoepokolenie-site/  
📦 **Репозиторий:** https://github.com/askuyr/novoepokolenie-site

![Превью проекта](site/assets/og-cover.jpg)

## Статус проекта

**Организация находится на этапе формирования.**

Сейчас мы собираем команду, уточняем структуру, готовим первые инициативы, форматы работы и партнёрские связи. Сайт используется как публичная точка входа в проект: здесь можно познакомиться с концепцией, направлениями, предложить идею и понять, как присоединиться к созданию организации.

## Идея

«Новое поколение» строится вокруг простой логики:

**Быть услышанным → Говорить → Делать**

Наша цель — создать понятный маршрут от идеи к команде, от команды к проекту, а от проекта — к реальному общественно полезному результату.

## Что уже есть на сайте

- адаптивная главная страница;
- концепция и логика «Три действия»;
- блоки «Кому подходит», «Что ты получишь» и «Как запускается проект»;
- структура формируемых направлений;
- страница проекта «Школа молодого чиновника»;
- форма «Предложить идею» с формированием и скачиванием `.txt`-заявки;
- FAQ «Как всё работает»;
- фирменная страница 404;
- страница контактов;
- интерактивный брендбук;
- цикличная бегущая строка;
- анимированная смена изображений в hero-блоке;
- микроанимации с поддержкой `prefers-reduced-motion`;
- клавиатурная навигация и улучшенные focus-состояния;
- Open Graph-превью для VK;
- sitemap, robots и базовая SEO-разметка;
- автоматическая публикация через GitHub Pages.

## Основные страницы

| Раздел | Ссылка |
| --- | --- |
| Главная | https://askuyr.github.io/novoepokolenie-site/ |
| Школа молодого чиновника | https://askuyr.github.io/novoepokolenie-site/school.html |
| Молодёжное движение | https://askuyr.github.io/novoepokolenie-site/youth-movement.html |
| Женское движение | https://askuyr.github.io/novoepokolenie-site/women-movement.html |
| Волонтёрский отдел | https://askuyr.github.io/novoepokolenie-site/volunteer-department.html |
| Проектный отдел | https://askuyr.github.io/novoepokolenie-site/project-department.html |
| Медиа-отдел | https://askuyr.github.io/novoepokolenie-site/media-department.html |
| Контакты | https://askuyr.github.io/novoepokolenie-site/contacts.html |
| Брендбук | https://askuyr.github.io/novoepokolenie-site/brandbook/ |

## Технологии

Сайт сделан без тяжёлых фреймворков и отдельной сборки:

- HTML5;
- CSS3;
- Vanilla JavaScript;
- локальные шрифты и графика;
- GitHub Actions;
- GitHub Pages.

## Структура репозитория

```text
novoepokolenie-site/
├── .github/
│   └── workflows/
│       └── pages.yml
├── site/
│   ├── index.html
│   ├── school.html
│   ├── contacts.html
│   ├── youth-movement.html
│   ├── women-movement.html
│   ├── volunteer-department.html
│   ├── project-department.html
│   ├── media-department.html
│   ├── 404.html
│   ├── styles.css
│   ├── direction.css
│   ├── school.css
│   ├── app.js
│   ├── assets/
│   ├── brandbook/
│   ├── robots.txt
│   └── sitemap.xml
└── README.md
```

## Локальный запуск

Для обычного просмотра можно открыть `site/index.html` в браузере.

Для более точной локальной проверки лучше запустить простой HTTP-сервер из папки `site`:

```bash
python3 -m http.server 8000
```

После этого открыть:

```text
http://localhost:8000/
```

## Публикация на GitHub Pages

Публичная версия разворачивается автоматически через GitHub Actions из папки `site/`.

Обычный процесс обновления:

1. Изменить нужные файлы в `site/`.
2. Сделать commit в ветку `main`.
3. Дождаться успешного workflow во вкладке **Actions**.
4. Проверить сайт по адресу: https://askuyr.github.io/novoepokolenie-site/

## Где что менять

| Задача | Файл |
| --- | --- |
| Главная страница | `site/index.html` |
| Основной дизайн | `site/styles.css` |
| Интерактив и форма идеи | `site/app.js` |
| Страницы направлений | `site/*-department.html`, `site/*-movement.html` |
| Стили направлений | `site/direction.css` |
| Школа молодого чиновника | `site/school.html`, `site/school.css` |
| Страница 404 | `site/404.html` |
| Графика и шрифты | `site/assets/` |
| Карта сайта | `site/sitemap.xml` |
| GitHub Pages workflow | `.github/workflows/pages.yml` |

## Важно

Сайт пока не должен создавать впечатление, что организация уже полностью сформирована и ведёт регулярную деятельность. Формулировки про команду, партнёров, проекты, мероприятия и результаты следует обновлять по мере их реального появления и подтверждения.

---

**Новое поколение**  
*От участия — к влиянию.*
