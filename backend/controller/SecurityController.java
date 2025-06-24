package com.avms.controller;

import com.avms.model.Visitor;
import com.avms.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/security")
public class SecurityController {

    @Autowired
    private SecurityService securityService;

    @GetMapping("/scan/{token}")
    public ResponseEntity<Visitor> scanVisitor(@PathVariable String token) {
        Visitor visitor = securityService.getVisitorByToken(token);
        if (visitor == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(visitor);
    }

    @PostMapping("/validateOtp")
    public ResponseEntity<Visitor> validateOtp(@RequestParam String otp) {
        Visitor visitor = securityService.getVisitorByOtp(otp);
        if (visitor == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(visitor);
    }

    @PutMapping("/markArrived/{id}")
    public ResponseEntity<Void> markArrived(@PathVariable Long id) {
        boolean success = securityService.markVisitorArrived(id);
        if (success) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/search")
    public ResponseEntity<Visitor> searchVisitor(@RequestParam String name) {
        Visitor visitor = securityService.searchVisitorByName(name);
        if (visitor == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(visitor);
    }
}
