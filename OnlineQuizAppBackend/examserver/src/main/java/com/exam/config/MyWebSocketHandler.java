package com.exam.config;

import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.TextMessage;
import org.springframework.stereotype.Component;

@Component
public class MyWebSocketHandler extends TextWebSocketHandler {

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        // Logica de procesare a mesajului primit de la client
        System.out.println("Mesaj primit: " + message.getPayload());

        // Răspuns la mesajul primit
        try {
            session.sendMessage(new TextMessage("Răspuns de la server: " + message.getPayload()));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
        System.out.println("Conexiune WebSocket stabilită cu clientul: " + session.getId());
    }
}
