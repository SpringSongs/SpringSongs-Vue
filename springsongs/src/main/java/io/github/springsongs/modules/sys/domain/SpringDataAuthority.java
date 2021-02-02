package io.github.springsongs.modules.sys.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import io.github.springsongs.annotation.Description;
import io.github.springsongs.common.base.SpringBase;
import io.swagger.annotations.ApiModelProperty;

@Entity
@DynamicInsert(true)
@DynamicUpdate(true)
@Table(name = "spring_data_authority", schema = "springsongs")
public class SpringDataAuthority extends SpringBase implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4571068395114183597L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Description(title = "主键")
	@Column(name = "id")
	@ApiModelProperty("主键")
	private int id;

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@NotBlank(message = "请填写编码")
	@Size(max = 45, min = 1)
	@Description(title = "编码")
	@Column(name = "code")
	private String code;

	public String getCode() {
		return this.code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@Description(title = "0未删1已删")
	@Column(name = "deleted_status", columnDefinition = "TINYINT(1)")
	private boolean deletedStatus;

	public boolean getDeletedStatus() {
		return this.deletedStatus;
	}

	public void setDeletedStatus(boolean deletedStatus) {
		this.deletedStatus = deletedStatus;
	}

	@NotBlank(message = "请填写名称")
	@Size(max = 45, min = 1)
	@Description(title = "名称")
	@Column(name = "name")
	private String name;

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Description(title = "上级主键")
	@Column(name = "parent_id")
	private int parentId;

	public int getParentId() {
		return this.parentId;
	}

	public void setParentId(int parentId) {
		this.parentId = parentId;
	}

	@NotBlank(message = "请填写系统编码")
	@Size(max = 45, min = 1)
	@Description(title = "系统编码")
	@Column(name = "system_code")
	private String systemCode;

	public String getSystemCode() {
		return this.systemCode;
	}

	public void setSystemCode(String systemCode) {
		this.systemCode = systemCode;
	}

}
