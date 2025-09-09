# 🎉 Página de Regalo de Cumpleaños

Una hermosa página web interactiva para entregar regalos virtuales de cumpleaños con cuenta regresiva y video de Canva integrado.

## 📁 Archivos incluidos

- `index.html` - Página principal con cuenta regresiva
- `styles.css` - Estilos de la página principal
- `app.js` - Funcionalidad de la página principal
- `regalo.html` - Página del regalo con video de Canva
- `regalo-styles.css` - Estilos de la página del regalo
- `regalo.js` - Funcionalidad de la página del regalo

## 🎬 Cómo personalizar el video de Canva

### Paso 1: Obtener el enlace de Canva
1. Ve a tu diseño en Canva
2. Haz clic en "Compartir" → "Más" → "Insertar"
3. Copia el enlace que aparece en el `src` del iframe

### Paso 2: Actualizar el código
En el archivo `regalo.html`, busca la línea 35 y reemplaza el enlace:

```html
<iframe 
    id="canva-video"
    src="TU_ENLACE_DE_CANVA_AQUÍ"
    allowfullscreen
    allow="fullscreen"
    loading="lazy">
</iframe>
```

**Ejemplo de enlace de Canva:**
```html
src="https://www.canva.com/design/DAF123ABC/view?embed"
```

### Paso 3: Cambiar dinámicamente (opcional)
También puedes cambiar el video desde la consola del navegador:
```javascript
giftPage.changeCanvaVideo("tu-nuevo-enlace-aquí");
```

## ⏰ Personalizar la fecha de la cuenta regresiva

En el archivo `app.js`, línea 6, cambia la fecha:

```javascript
const targetDate = new Date('2025-12-25T00:00:00-05:00').getTime();
```

### Formatos de fecha:
- **Hora local**: `'2025-12-25 00:00:00'`
- **Con zona horaria**: `'2025-12-25T00:00:00-05:00'` (GMT-5)
- **UTC**: `'2025-12-25T00:00:00Z'`

### Usando funciones:
```javascript
// Desde la consola del navegador:
giftPage.setTargetDate(2025, 12, 25, 0, 0, 0); // año, mes, día, hora, minuto, segundo
giftPage.setTargetDateWithTimezone('2025-12-25T00:00:00-05:00');
```

## 📝 Personalizar mensajes

### En `index.html`:
- Línea 42: Cambiar "¡Feliz Cumpleaños!" por el nombre
- Línea 45: Personalizar subtítulo

### En `regalo.html`:
- Línea 23: Cambiar título del regalo
- Línea 76-82: Personalizar mensaje de cumpleaños
- Línea 85: Cambiar firma

## 🎨 Personalizar colores

En `styles.css` y `regalo-styles.css`, busca estas variables:

```css
/* Colores principales */
#ff6b6b /* Rosa principal */
#ffd93d /* Dorado */
#6bcf7f /* Verde */
#4d9de0 /* Azul */
```

## 🚀 Cómo usar

1. **Para testing**: Doble click en el título para saltarse la cuenta regresiva
2. **Compartir**: Usar los botones de compartir en la página del regalo
3. **Efectos**: Triple click en el título del regalo para más confetti

## 📱 Características

- ✅ **Totalmente responsivo** (móvil, tablet, desktop)
- ✅ **Cuenta regresiva personalizable**
- ✅ **Efectos de confetti y animaciones**
- ✅ **Integración con Canva**
- ✅ **Botones de compartir** (WhatsApp, Facebook)
- ✅ **Carga optimizada** con overlay
- ✅ **Easter eggs** y efectos especiales

## 🛠️ Funciones disponibles

### Página principal (`index.html`):
```javascript
giftPage.setTargetDate(año, mes, día, hora, minuto, segundo)
giftPage.setTargetDateWithTimezone("fecha-iso")
giftPage.toggleServerTime(true/false)
giftPage.skipCountdown()
giftPage.launchConfetti()
```

### Página del regalo (`regalo.html`):
```javascript
giftPage.changeCanvaVideo("nuevo-enlace")
giftPage.relaunchConfetti()
giftPage.shareGift()
giftPage.goBack()
```

## 📊 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge
- ✅ iOS Safari, Chrome Mobile
- ✅ Todos los tamaños de pantalla
- ✅ Funciona offline (excepto video de Canva)

## 🎯 Tips de uso

1. **Prueba la página** antes de enviarla
2. **Verifica el enlace de Canva** que funcione
3. **Personaliza los mensajes** para la ocasión
4. **Configura la fecha correctamente** con zona horaria
5. **Comparte el enlace** directo a `index.html`

¡Disfruta creando momentos especiales! 🎁✨
