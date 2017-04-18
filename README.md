Автор: Артур Кармов
 >Добавил к базовой сборке следующие таски:
1) Генерация спрайтов из графических файлов
 > Запуск: gulp sprite:pngif
  
 > Реализация: Используется плагин ```gulp.spritesmith``` [GitHub](https://github.com/twolfson/gulp.spritesmith), который берет исходники из   ```source/images/sprite``` и генерирует спрайт и файл стилей в ```build/assets/img/sprite/sprite.png``` и ```build/assets/img/sprite/sprite.css``` соответсвенно

2) копирование файлов из папки с исходниками в папку для продакшена (картинки, шрифты)
 > Запуск: gulp copy:media

>  Реализация: Запускает два других таска: copy:image и copy:fonts.
```copy:fonts``` копирует все шрифты из папки ```source/fonts``` в папку ```build/assets/fonts```.
```copy:image``` в готовую таску из исходной сборки добавил исключение для папки ```source/images/sprite```.

#### Для начала работы

1. ```clone this repo```
2. ```cd path/to/...```
3. ```npm install gulpjs/gulp-cli -g```  
> Установка последней версии Gulp CLI tools глобально (подробнее - [GitHub](https://github.com/gulpjs/gulp/blob/4.0/docs/getting-started.md) )

4. ```npm install```
6. ```run gulp``` 

