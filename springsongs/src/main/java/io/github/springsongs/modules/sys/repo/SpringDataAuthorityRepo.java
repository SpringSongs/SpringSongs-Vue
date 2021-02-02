package io.github.springsongs.modules.sys.repo;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import io.github.springsongs.modules.sys.domain.SpringDataAuthority;

@Repository
public interface SpringDataAuthorityRepo extends JpaRepository<SpringDataAuthority, Integer> {
	/**
	 * 分页查询
	 * 
	 * @param spec
	 * @param pageable
	 * @return
	 */
	Page<SpringDataAuthority> findAll(Specification<SpringDataAuthority> spec, Pageable pageable);

	/**
	 *
	 * IN查询
	 * 
	 * @param ids
	 * @return List<SpringDataAuthority>
	 * @see [相关类/方法]（可选）
	 * @since [产品/模块版本] （可选）
	 */
	@Query(value = "from SpringDataAuthority where id in (:ids) and  deletedStatus=0 ")
	public List<SpringDataAuthority> findInIds(@Param(value = "ids") List<Integer> ids);

	/**
	 *
	 * 逻辑删除
	 * 
	 * @param id
	 * @return
	 * @see [相关类/方法]（可选）
	 * @since [产品/模块版本] （可选）
	 */
	@Transactional
	@Modifying
	@Query(value = "update SpringDataAuthority set deletedStatus=1 where id=:id")
	public void setDelete(@Param(value = "id") Integer id);

	/**
	 *
	 * 逻辑批量删除
	 * 
	 * @param ids
	 * @return
	 * @see [相关类/方法]（可选）
	 * @since [产品/模块版本] （可选）
	 */
	@Transactional
	@Modifying
	@Query(value = "update SpringDataAuthority set deletedStatus=1 where id in (:ids)")
	public void setDelete(@Param(value = "ids") List<Integer> ids);

	/**
	 *
	 * 逻辑批量删除
	 * 
	 * @param ids
	 * @return
	 * @see [相关类/方法]（可选）
	 * @since [产品/模块版本] （可选）
	 */
	@Transactional
	@Modifying
	@Query(value = "update SpringDataAuthority set deletedStatus=1 where id in (:ids) and createdUserId=:createdUserId")
	public void setDeleteByCreatedUserId(@Param(value = "ids") List<Integer> ids,
			@Param(value = "createdUserId") String createdUserId);

	/**
	 *
	 * 逻辑批量删除
	 * 
	 * @param ids
	 * @return
	 * @see [相关类/方法]（可选）
	 * @since [产品/模块版本] （可选）
	 */
	@Transactional
	@Modifying
	@Query(value = "update SpringDataAuthority set deletedStatus=1 where id=:id and createdUserId=:createdUserId")
	public void setDeleteByCreatedUserId(@Param(value = "id") Integer id,
			@Param(value = "createdUserId") String createdUserId);

}