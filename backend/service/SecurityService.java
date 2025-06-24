package com.avms.service;

import com.avms.model.Visitor;
import com.avms.repository.VisitorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SecurityService {

    @Autowired
    private VisitorRepository visitorRepository;

    public Visitor getVisitorByToken(String token) {
        // Implement logic to find visitor by QR token
        return visitorRepository.findByQrToken(token);
    }

    public Visitor getVisitorByOtp(String otp) {
        // Implement logic to find visitor by OTP
        return visitorRepository.findByOtp(otp);
    }

    public boolean markVisitorArrived(Long id) {
        Visitor visitor = visitorRepository.findById(id).orElse(null);
        if (visitor != null) {
            visitor.setArrived(true);
            visitorRepository.save(visitor);
            return true;
        }
        return false;
    }

    public Visitor searchVisitorByName(String name) {
        // Implement search logic by name or phone
        List<Visitor> visitors = visitorRepository.findByNameContainingIgnoreCase(name);
        if (visitors != null && !visitors.isEmpty()) {
            return visitors.get(0);
        }
        return null;
    }
}
