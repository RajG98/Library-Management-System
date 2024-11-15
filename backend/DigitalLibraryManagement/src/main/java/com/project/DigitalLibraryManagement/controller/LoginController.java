package com.project.DigitalLibraryManagement.controller;
import com.project.DigitalLibraryManagement.handler.CustomAuthenticationSuccessHandler;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
public class LoginController {

    private final CustomAuthenticationSuccessHandler customSuccessHandler;
    private final AuthenticationManager authenticationManager;
    public LoginController(CustomAuthenticationSuccessHandler customSuccessHandler,AuthenticationManager authenticationManager){
        this.customSuccessHandler=customSuccessHandler;
        this.authenticationManager=authenticationManager;
    }
    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request, HttpServletResponse response) {
        String username = loginRequest.username();
        String password = loginRequest.password();

        Authentication authenticationRequest= UsernamePasswordAuthenticationToken.unauthenticated(username,password);
        Authentication  authenticationResponse= authenticationManager.authenticate(authenticationRequest);

        try{
            customSuccessHandler.onAuthenticationSuccess(request,response,authenticationResponse);
        }catch(IOException ex){
            System.out.println(ex.getMessage());
            return ResponseEntity.status(500).build();
        }
        return ResponseEntity.ok().build();

    }
    public record LoginRequest(String username,String password){

    }
}
