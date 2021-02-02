package io.github.springsongs.modules.sys.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import io.github.springsongs.enumeration.ResultCode;
import io.github.springsongs.exception.SpringSongsException;
import io.github.springsongs.modules.sys.domain.SpringDataAuthority;
import io.github.springsongs.modules.sys.dto.SpringDataAuthorityDTO;
import io.github.springsongs.modules.sys.query.SpringDataAuthorityQuery;
import io.github.springsongs.modules.sys.repo.SpringDataAuthorityRepo;
import io.github.springsongs.modules.sys.service.ISpringDataAuthorityService;
import io.github.springsongs.util.Constant;

@Service
public class SpringDataAuthorityServiceImpl implements ISpringDataAuthorityService {

	static Logger logger = LoggerFactory.getLogger(SpringDataAuthorityServiceImpl.class);
	@Autowired
	private SpringDataAuthorityRepo springDataAuthorityRepo;

	@Override
	public void deleteByPrimaryKey(Integer id) {
		try {
			springDataAuthorityRepo.deleteById(id);
		} catch (Exception e) {
			logger.error(e.getMessage());
			throw new SpringSongsException(ResultCode.SYSTEM_ERROR);
		}
	}

	@Override
	public void insert(SpringDataAuthorityDTO record) {
		SpringDataAuthority springDataAuthorityDo = new SpringDataAuthority();
		BeanUtils.copyProperties(record, springDataAuthorityDo);
		try {
			springDataAuthorityRepo.save(springDataAuthorityDo);
		} catch (Exception e) {
			logger.error(e.getMessage());
			throw new SpringSongsException(ResultCode.SYSTEM_ERROR);
		}
	}

	@Override
	public SpringDataAuthorityDTO selectByPrimaryKey(Integer id) {
		SpringDataAuthority springDataAuthority = springDataAuthorityRepo.getOne(id);
		// Optional.ofNullable(springActVacationApprove).orElseThrow(()->new //
		// SpringSongsException(ResultCode.INFO_NOT_FOUND));
		if (null == springDataAuthority) {
			throw new SpringSongsException(ResultCode.INFO_NOT_FOUND);
		}
		SpringDataAuthorityDTO springDataAuthorityDTO = new SpringDataAuthorityDTO();
		BeanUtils.copyProperties(springDataAuthority, springDataAuthorityDTO);
		return springDataAuthorityDTO;
	}

	@Override
	public void updateByPrimaryKey(SpringDataAuthorityDTO record) {
		SpringDataAuthority springDataAuthority = springDataAuthorityRepo.getOne(record.getId());
		// Optional.ofNullable(springActVacationApprove).orElseThrow(()->new
		// SpringSongsException(ResultCode.INFO_NOT_FOUND));
		if (null == springDataAuthority) {
			throw new SpringSongsException(ResultCode.INFO_NOT_FOUND);
		}
		try {
			SpringDataAuthority springDataAuthorityDO = new SpringDataAuthority();
			BeanUtils.copyProperties(record, springDataAuthorityDO);
			springDataAuthorityRepo.save(springDataAuthorityDO);
		} catch (Exception e) {
			logger.error(e.getMessage());
			throw new SpringSongsException(ResultCode.SYSTEM_ERROR);
		}
	}

	@Override
	public Page<SpringDataAuthorityDTO> getAllRecordByPage(SpringDataAuthorityQuery record, Pageable pageable) {
		if (pageable.getPageSize() <= 0 || pageable.getPageSize() > Constant.MAX_PAGE_SIZE) {
			throw new SpringSongsException(ResultCode.PARAMETER_MORE_1000);
		}
		int page = pageable.getPageNumber() <= 0 ? 0 : pageable.getPageNumber() - 1;
		pageable = PageRequest.of(page, pageable.getPageSize());
		Specification<SpringDataAuthority> specification = new Specification<SpringDataAuthority>() {
			@Override
			public Predicate toPredicate(Root<SpringDataAuthority> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<>();
				if (!StringUtils.isEmpty(record.getCreatedUserId())) {
					Predicate createdUserId = cb.equal(root.get("createdUserId").as(String.class),
							record.getCreatedUserId());
					predicates.add(createdUserId);
				}
				Predicate deletionStateCode = cb.equal(root.get("deletedStatus").as(Boolean.class), false);
				predicates.add(deletionStateCode);
				Predicate[] pre = new Predicate[predicates.size()];
				query.where(predicates.toArray(pre));
				query.orderBy(cb.desc(root.get("createdOn").as(Date.class)));
				return query.getRestriction();
			}
		};
		Page<SpringDataAuthority> springDataAuthorityList = springDataAuthorityRepo.findAll(specification, pageable);
		List<SpringDataAuthorityDTO> springDataAuthorityDTOList = new ArrayList<>();
		springDataAuthorityList.stream().forEach(springDataAuthority -> {
			SpringDataAuthorityDTO springDataAuthorityDTO = new SpringDataAuthorityDTO();
			BeanUtils.copyProperties(springDataAuthority, springDataAuthorityDTO);
			springDataAuthorityDTOList.add(springDataAuthorityDTO);
		});
		Page<SpringDataAuthorityDTO> pages = new PageImpl(springDataAuthorityDTOList, pageable,
				springDataAuthorityList.getTotalElements());
		return pages;
	}

	@Override
	public void setDeleted(List<Integer> ids) {
		if (CollectionUtils.isEmpty(ids)) {
			throw new SpringSongsException(ResultCode.PARAMETER_NOT_NULL_ERROR);
		} else if (ids.size() > 1000) {
			throw new SpringSongsException(ResultCode.PARAMETER_MORE_1000);
		}
		try {
			springDataAuthorityRepo.setDelete(ids);
		} catch (Exception ex) {
			logger.error(ex.getMessage());
			throw new SpringSongsException(ResultCode.SYSTEM_ERROR);
		}
	}

	@Override
	public void batchSaveExcel(List<String[]> list) {
	}

}
