import './style.css'
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap'
import $ from 'jquery'

import Alpine from 'alpinejs'
import Clipboard from "@ryangjchandler/alpine-clipboard"

window.jQuery = window.$ = $

Alpine.plugin(Clipboard)

window.Alpine = Alpine

Alpine.data('appData', ()=>(
  {
    r_code: '', //藍色碼
    g_code: '', //綠色碼
    b_code: '', //紅色碼
    random_red() {
        this.r_code = Math.ceil(Math.random() * 255).toString().padStart(3, '0')
    },
    random_green() {
        this.g_code = Math.ceil(Math.random() * 255).toString().padStart(3, '0')
    },
    random_blue() {
        this.b_code = Math.ceil(Math.random() * 255).toString().padStart(3, '0')
    },
    switch: false,
    switch_text: '關閉',
    change: '',
    random_all() {
        this.random_red()
        this.random_green()
        this.random_blue()
    },
    changeColor(param) {
        switch (param) {
            case 'on':
                this.switch = true
                this.switch_text = '開啟'
                this.change = setInterval(() => {
                    this.random_all()
                }, 100);
                break
            case 'off':
                this.switch = false
                this.switch_text = '關閉'
                clearInterval(this.change)
                this.change = ''
                break
        }
    },
    get rgb() {
        return `background-color: rgb(${this.r_code}, ${this.g_code}, ${this.b_code});color: rgb(${255 - this.r_code}, ${255 - this.g_code}, ${255 - this.b_code})`
    },
    get rgb_text() {
        return `#${Number(this.r_code).toString(16).toUpperCase().padStart(2, '0')}${Number(this.g_code).toString(16).toUpperCase().padStart(2, '0')}${Number(this.b_code).toString(16).toUpperCase().padStart(2, '0')}`
    },
    adjust_switch: false,
    adjust_process: '',
    adjust(param) {
        switch (param) {
            case 'plus':
                this.adjust_switch = true
                this.adjust_process = setInterval(() => {
                    if (Number(this.r_code) < 255) {
                        this.r_code++
                    }
                    if (Number(this.g_code) < 255) {
                        this.g_code++
                    }
                    if (Number(this.b_code) < 255) {
                        this.b_code++
                    }
                }, 100);
                break;
            case 'minus':
                this.adjust_switch = true
                this.adjust_process = setInterval(() => {
                    if (Number(this.r_code) > 0) {
                        this.r_code--
                    }
                    if (Number(this.g_code) > 0) {
                        this.g_code--
                    }
                    if (Number(this.b_code) > 0) {
                        this.b_code--
                    }
                }, 100);
                break;
            case 'stop':
                this.adjust_switch = false
                clearInterval(this.adjust_process)
                break;
        }
    },
    isModalOpen: true,
    inputNumber: 0,
    colorParam: '',
    modalOpen() {
        $('#colorModal').show()
    },
    modalClose() {
        $('#colorModal').hide()
    },
    inputColor(param) {
        switch (param) {
            case 'red':
                this.inputNumber = this.r_code
                break;
            case 'green':
                this.inputNumber = this.g_code
                break;
            case 'blue':
                this.inputNumber = this.b_code
                break;
        }
        this.colorParam = param
        this.modalOpen()
    },
    saveColor() {
        if (this.inputNumber > 255) {
            alert('請輸入255以下的數字')
            this.inputNumber = 255
            return
        }
        if (this.inputNumber < 0) {
            alert('請輸入0以上的數字')
            this.inputNumber = 0
            return
        }

        switch (this.colorParam) {
            case 'red':
                this.r_code = this.inputNumber.toString().padStart(3, '0')
                break;
            case 'green':
                this.g_code = this.inputNumber.toString().padStart(3, '0')
                break;
            case 'bblue':
                this.b_code = this.inputNumber.toString().padStart(3, '0')
                break;
        }
        this.inputNumber = 0
        this.colorParam = ''
        this.modalClose()
    }

}
))

Alpine.start()
