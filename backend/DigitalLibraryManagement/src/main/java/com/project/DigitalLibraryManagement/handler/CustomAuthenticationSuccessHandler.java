package com.project.DigitalLibraryManagement.handler;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomAuthenticationSuccessHandler {
    private final SecurityContextRepository securityContextRepository;

    public CustomAuthenticationSuccessHandler() {
        this.securityContextRepository = new HttpSessionSecurityContextRepository();
    }

    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authenticationResponse) throws IOException {
        SecurityContext context= SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authenticationResponse);
        securityContextRepository.saveContext(context,request,response);
    }
}
