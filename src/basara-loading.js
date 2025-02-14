const generateRandomString = (length = 12) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const BasaraLoading = class {
  #wrap = ''

  /**
   * 
   * @param {Object} option - 設定
   * @param {String} option.iconColor - アイコン色
   * @param {Number} option.iconSize  - アイコンサイズ(px)
   * @param {Number} option.speed  - 回転速度(ms)
   * @param {String} option.text  - 表示文字列
   */
  constructor(option = {}) {
    if (!this.#wrap) {
      const wrap = document.createElement('div')
      wrap.setAttribute(`data-${generateRandomString()}`, '');
      wrap.style.backgroundColor = '#ccccccaa';
      wrap.style.justifyContent = 'center';
      wrap.style.alignItems = 'center';
      wrap.style.position = 'fixed';
      wrap.style.zIndex = '99999';
      wrap.style.top = '0';
      wrap.style.left = '0';
      wrap.style.width = '100vw';
      wrap.style.height = '100vh';
      wrap.style.display = 'none';

      // loadingのSVG

      const iconWrap = document.createElement('div')
      iconWrap.style.display = 'flex'
      iconWrap.style.flexDirection = 'column'
      iconWrap.style.gap = '5px'

      const iconBody = document.createElement('div')
      iconBody.style.width = (option.iconSize ?? 50) + 'px'
      iconBody.style.height = (option.iconSize ?? 50) + 'px'
      iconBody.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${option.iconSize || 50}" height="${option.iconSize || 50}" viewBox="0 0 24 24"><path fill="${option.iconColor || 'currentColor'}" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8"/></svg>`
      iconBody.animate([
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(360deg)' }
      ], {
        duration: option.speed ?? 1500,
        easing: 'linear',
        iterations: Infinity
      });
      iconWrap.appendChild(iconBody)

      if (option.text) {
        const iconText = document.createElement('small')
        iconText.style.display = 'block'
        iconText.style.textAlign = 'center'
        iconText.style.whiteSpace = 'nowrap'
        iconText.innerText = option.text
        iconWrap.appendChild(iconText)
      }

      wrap.appendChild(iconWrap)

      this.#wrap = wrap
      const body = document.querySelector('body')
      if (body) body.appendChild(wrap)
    }
  }

  open() {
    this.#wrap.style.display = 'flex'
  }

  close() {
    if (this.#wrap)
    this.#wrap.style.display = 'none'
  }
}

export default BasaraLoading