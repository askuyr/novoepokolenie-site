<p align="center">
  <img src="site/assets/logo-main.png" alt="Новое поколение" width="170">
</p>

<h1 align="center">Новое поколение</h1>

<p align="center">
  Молодёжная организация и открытая платформа для инициатив, развития и реальных действий.
  <br>
  <strong>Не ждать перемен. Создавать их.</strong>
</p>

<p align="center">
  <a href="https://askuyr.github.io/novoepokolenie-site/"><strong>Открыть сайт</strong></a>
  ·
  <a href="https://askuyr.github.io/novoepokolenie-site/school.html">Школа молодого чиновника</a>
  ·
  <a href="https://askuyr.github.io/novoepokolenie-site/brandbook/">Брендбук</a>
</p>

---

## О проекте

**«Новое поколение»** — сайт молодёжной организации, которая объединяет молодых людей, наставников, общественные институты и профессиональную среду вокруг практической работы с инициативами.

Главная логика проекта:

> **Быть услышанным → Говорить → Делать**

Сайт помогает понять, чем занимается организация, выбрать направление участия, познакомиться с возможностями, предложить собственную идею и перейти к конкретному действию.

## Что уже реализовано

- адаптивная главная страница;
- интерактивный маршрут **«Три действия»**;
- блоки **«Кому подходит»**, **«Что ты получишь»** и **«Как запускается проект»**;
- пять направлений организации;
- отдельная страница кадрового проекта **«Школа молодого чиновника»**;
- форма-конструктор **«Предложить идею»**;
- отдельная страница контактов;
- интерактивный брендбук;
- цикличная бегущая строка;
- анимированная смена фирменных изображений в hero-блоке;
- плавный возврат наверх по клику на логотип;
- мобильное меню;
- адаптация под десктоп, планшет и смартфоны;
- автоматическая публикация через GitHub Pages.

## Страницы

| Раздел | Ссылка |
| --- | --- |
| Главная | [Открыть](https://askuyr.github.io/novoepokolenie-site/) |
| Школа молодого чиновника | [Открыть](https://askuyr.github.io/novoepokolenie-site/school.html) |
| Молодёжное движение | [Открыть](https://askuyr.github.io/novoepokolenie-site/youth-movement.html) |
| Женское движение | [Открыть](https://askuyr.github.io/novoepokolenie-site/women-movement.html) |
| Волонтёрский отдел | [Открыть](https://askuyr.github.io/novoepokolenie-site/volunteer-department.html) |
| Проектный отдел | [Открыть](https://askuyr.github.io/novoepokolenie-site/project-department.html) |
| Медиа-отдел | [Открыть](https://askuyr.github.io/novoepokolenie-site/media-department.html) |
| Контакты | [Открыть](https://askuyr.github.io/novoepokolenie-site/contacts.html) |
| Брендбук | [Открыть](https://askuyr.github.io/novoepokolenie-site/brandbook/) |

## Технологии

Проект сделан как лёгкий статический сайт без фреймворков и обязательной сборки:

- HTML5;
- CSS3;
- Vanilla JavaScript;
- локальные шрифты и графика;
- GitHub Actions;
- GitHub Pages.

`npm install`, Node.js и отдельный build-step для запуска сайта не требуются.

## Структура репозитория

```text
.
├── .github/
│   └── workflows/
│       └── pages.yml
├── site/
│   ├── assets/
│   ├── brandbook/
│   │   └── index.html
│   ├── index.html
│   ├── school.html
│   ├── contacts.html
│   ├── youth-movement.html
│   ├── women-movement.html
│   ├── volunteer-department.html
│   ├── project-department.html
│   ├── media-department.html
│   ├── styles.css
│   ├── direction.css
│   ├── school.css
│   ├── app.js
│   ├── robots.txt
│   ├── sitemap.xml
│   └── .nojekyll
└── README.md
```

## Локальный запуск

Из корня репозитория:

```bash
python3 -m http.server 8000 --directory site
```

После запуска сайт будет доступен по адресу:

```text
http://localhost:8000/
```

## GitHub Pages

Сайт публикуется автоматически через workflow:

```text
.github/workflows/pages.yml
```

В **Settings → Pages → Build and deployment** должен быть выбран источник **GitHub Actions**.

После каждого commit в ветку `main` GitHub Actions автоматически публикует содержимое папки `site/`.

Публичный адрес:

**https://askuyr.github.io/novoepokolenie-site/**

## Где что менять

| Что нужно изменить | Файл |
| --- | --- |
| Главная страница и тексты | `site/index.html` |
| Внешний вид главной | `site/styles.css` |
| Анимации и интерактивность | `site/app.js` |
| Страницы направлений | `site/*-movement.html`, `site/*-department.html` |
| Стили направлений | `site/direction.css` |
| Школа молодого чиновника | `site/school.html`, `site/school.css` |
| Контакты | `site/contacts.html` |
| Изображения, логотипы, шрифты | `site/assets/` |
| Брендбук | `site/brandbook/index.html` |
| SEO-карта сайта | `site/sitemap.xml` |

## Важно

- не удаляйте `.github/workflows/pages.yml`, если нужен автоматический деплой;
- публичные файлы сайта находятся в папке `site/`;
- используйте относительные пути внутри сайта, чтобы GitHub Pages корректно работал в `/novoepokolenie-site/`;
- фактические партнёры, мероприятия, достижения и статистику стоит добавлять только после подтверждения данных.

---

<p align="center">
  <strong>Новое поколение</strong><br>
  От участия — к влиянию.
</p>
