package com.avms.controller;

import com.avms.model.Visitor;
import com.avms.service.VisitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resident")
public class VisitorController {

    @Autowired
    private VisitorService visitorService;

    @PostMapping("/addVisitor")
    public ResponseEntity<Visitor> addVisitor(@RequestBody Visitor visitor) {
        Visitor savedVisitor = visitorService.addVisitor(visitor);
        return ResponseEntity.ok(savedVisitor);
    }

    @GetMapping("/viewVisitors")
    public ResponseEntity<List<Visitor>> viewVisitors() {
        List<Visitor> visitors = visitorService.getAllVisitors();
        return ResponseEntity.ok(visitors);
    }
}
