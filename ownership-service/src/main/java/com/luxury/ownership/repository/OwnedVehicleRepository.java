package com.luxury.ownership.repository;

import com.luxury.ownership.entity.OwnedVehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OwnedVehicleRepository extends JpaRepository<OwnedVehicle, Long> {
    List<OwnedVehicle> findByUserId(Long userId);
    OwnedVehicle findByVin(String vin);
}
