package com.ayoub.incidenttracker.service;

import com.ayoub.incidenttracker.domain.entity.UserEntity;
import com.ayoub.incidenttracker.dto.auth.*;
import com.ayoub.incidenttracker.repository.UserRepository;
import com.ayoub.incidenttracker.security.jwt.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already used");
        }

        UserEntity user = new UserEntity();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));

        userRepository.save(user);

        String token = jwtService.generateToken(user.getEmail());
        return new AuthResponse(token);
    }

    public AuthResponse login(LoginRequest req) {
        UserEntity user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        boolean ok = passwordEncoder.matches(req.getPassword(), user.getPassword());
        if (!ok) throw new RuntimeException("Invalid credentials");

        String token = jwtService.generateToken(user.getEmail());
        return new AuthResponse(token);
    }
}