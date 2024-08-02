import { Signal } from "./signal"

export class WebSocketProxy {

    public readonly socket: WebSocket
    public readonly url: string

    public readonly sended: Signal<string>
    public readonly opened: Signal<Event>
    public readonly received: Signal<MessageEvent>
    public readonly errored: Signal<Event>
    public readonly closed: Signal<CloseEvent>

    public constructor(argument: string | URL | WebSocket) {
        const WebSocket: typeof window.WebSocket = new Function("return " + ["Web", "Socket"].join(""))()
        if (typeof argument == "string" || argument instanceof URL) {
            this.url = argument.toString()
            this.socket = new WebSocket(this.url)
        } else {
            this.url = argument.url
            this.socket = argument
        }

        this.sended = new Signal()
        this.opened = new Signal()
        this.received = new Signal()
        this.errored = new Signal()
        this.closed = new Signal()

        const originalSend = this.socket.send
        const originalOnOpen = this.socket.onopen ?? (() => {})
        const originalOnMessage = this.socket.onmessage ?? (() => {})
        const originalOnError = this.socket.onerror ?? (() => {})
        const originalOnClose = this.socket.onclose ?? (() => {})

        this.socket.send = (message: string): void => {
            originalSend.call(this.socket, message)
            this.sended.emit(message)
        }
        this.socket.onopen = (event: Event): void => {
            originalOnOpen.call(this.socket, event)
            this.opened.emit(event)
        }
        this.socket.onmessage = (event: MessageEvent): void => {
            originalOnMessage.call(this.socket, event)
            this.received.emit(event)
        }
        this.socket.onerror = (event: Event): void => {
            originalOnError.call(this.socket, event)
            this.errored.emit(event)
        }
        this.socket.onclose = (event: CloseEvent): void => {
            originalOnClose.call(this.socket, event)
            this.closed.emit(event)
        }
    }

    public send(this: this, message: string): void {
        this.socket.send(message)
    }

    public close(this: this): void {
        this.socket.close()
    }
}
