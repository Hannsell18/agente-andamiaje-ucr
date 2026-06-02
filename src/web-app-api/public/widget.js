(function () {
    const script     = document.currentScript;
    const serverUrl  = script.getAttribute('data-server') || (new URL(script.src)).origin;
    const chatPath   = script.getAttribute('data-path')   || '/';
    const label      = script.getAttribute('data-label')  || '💬';

    const css = `
        #ucr-widget-btn {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: #0e639c;
            color: #fff;
            font-size: 24px;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 16px rgba(0,0,0,0.35);
            z-index: 99999;
            transition: background 0.2s, transform 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        #ucr-widget-btn:hover { background: #1177bb; transform: scale(1.08); }

        #ucr-widget-frame {
            position: fixed;
            bottom: 92px;
            right: 24px;
            width: 380px;
            height: 560px;
            border: none;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.4);
            z-index: 99998;
            display: none;
            transition: opacity 0.2s;
        }

        @media (max-width: 480px) {
            #ucr-widget-frame {
                width: calc(100vw - 16px);
                height: calc(100vh - 100px);
                right: 8px;
                bottom: 80px;
            }
        }
    `;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    const btn = document.createElement('button');
    btn.id = 'ucr-widget-btn';
    btn.setAttribute('aria-label', 'Abrir asistente de programación');
    btn.textContent = label;

    const frame = document.createElement('iframe');
    frame.id    = 'ucr-widget-frame';
    frame.src   = serverUrl + chatPath;
    frame.setAttribute('allow', 'clipboard-read; clipboard-write');
    frame.setAttribute('title', 'Asistente de Programación UCR');

    let open = false;
    btn.addEventListener('click', () => {
        open = !open;
        frame.style.display = open ? 'block' : 'none';
        btn.textContent = open ? '✕' : label;
    });

    document.body.appendChild(frame);
    document.body.appendChild(btn);
})();
