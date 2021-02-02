package io.github.springsongs.modules.sys.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.github.springsongs.modules.sys.domain.SpringRoleData;

@Repository
public interface SpringRoleDataRepo extends JpaRepository<SpringRoleData, Integer> {
	/**
	 * 分页查询
	 * 
	 * @param spec
	 * @param pageable
	 * @return
	 */
	Page<SpringRoleData> findAll(Specification<SpringRoleData> spec, Pageable pageable);
}
