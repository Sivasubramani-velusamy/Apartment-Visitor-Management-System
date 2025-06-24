package com.avms.repository;

import com.avms.model.VisitorTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitorTemplateRepository extends JpaRepository<VisitorTemplate, Long> {
}
