package com.luxury.appointment.repository;

import com.luxury.appointment.entity.Dealership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DealershipRepository extends JpaRepository<Dealership, Long> {
    List<Dealership> findByAddressContainingIgnoreCase(String address);
}
