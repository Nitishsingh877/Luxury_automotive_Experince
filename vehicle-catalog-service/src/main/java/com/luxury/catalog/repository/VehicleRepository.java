package com.luxury.catalog.repository;

import com.luxury.catalog.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByModelNameContainingIgnoreCase(String modelName);
    
    @Query("SELECT v FROM Vehicle v WHERE v.basePrice BETWEEN :minPrice AND :maxPrice")
    List<Vehicle> findByPriceRange(@Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice);
}
