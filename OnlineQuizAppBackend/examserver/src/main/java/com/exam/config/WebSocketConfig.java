package com.exam.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final MyWebSocketHandler myWebSocketHandler;

    // Injectează MyWebSocketHandler
    public WebSocketConfig(MyWebSocketHandler myWebSocketHandler) {
        this.myWebSocketHandler = myWebSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // Folosește handler-ul concret pentru a gestiona conexiunile WebSocket
        registry.addHandler(myWebSocketHandler, "/ws")
                .setAllowedOrigins("http://localhost:3000")  // Permite originile frontend-ului
                .withSockJS();  // Opțional pentru fallback
    }
}
