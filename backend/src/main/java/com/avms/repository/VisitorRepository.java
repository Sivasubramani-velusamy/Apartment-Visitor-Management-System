package com.avms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.avms.model.Visitor;

@Repository
public interface VisitorRepository extends JpaRepository<Visitor, Long> {
    Visitor findByQrToken(String qrToken);
    Visitor findByOtp(String otp);
    List<Visitor> findByNameContainingIgnoreCase(String name);
}
