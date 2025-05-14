// Ждём полной загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
  
    // Обработчик переключения языка
    function switchLanguage(targetLang) {
      const currentPath = window.location.pathname;
      const targetLangPrefix = `/${targetLang}/`;
      const otherLang = targetLang === 'ua' ? 'us' : 'ua';
      const otherLangPrefix = `/${otherLang}/`;
  
      let newPath;
  
      if (currentPath.startsWith(otherLangPrefix)) {
        const relativePath = currentPath.substring(otherLangPrefix.length);
        newPath = targetLangPrefix + relativePath;
      } else if (currentPath.startsWith(targetLangPrefix)) {
        return; // Уже нужный язык
      } else {
        newPath = `${targetLangPrefix}index.html`; // Запасной вариант
      }
  
      console.log("Переход на:", newPath);
      window.location.href = newPath;
    }
  
    // Подключаем обработчики к кнопкам
    document.querySelectorAll('.lang-button').forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const targetLang = event.currentTarget.dataset.lang;
        if (targetLang) {
          switchLanguage(targetLang);
        } else {
          console.warn("Нет атрибута data-lang у кнопки:", event.currentTarget);
        }
      });
    });
  
    console.log("Скрипт загружен и готов к работе");
  
  });
  