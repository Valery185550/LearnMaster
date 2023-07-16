using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WebApi;

public partial class LearnMasterContext : DbContext
{
    public LearnMasterContext()
    {
    }

    public LearnMasterContext(DbContextOptions<LearnMasterContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Course> Courses { get; set; }

    public virtual DbSet<Grade> Grades { get; set; }

    public virtual DbSet<Homework> Homeworks { get; set; }

    public virtual DbSet<Lesson> Lessons { get; set; }

    public virtual DbSet<Message> Messages { get; set; }

    public virtual DbSet<Notification> Notifications { get; set; }

    public virtual DbSet<UsersCourse> UsersCourses { get; set; }

    public virtual DbSet<Video> Videos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlite("Data Source=D:\\\\\\\\LearnMaster\\\\\\\\WebApi\\\\\\\\LearnMaster.db");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Course>(entity =>
        {
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Title).HasColumnName("title");
        });

        modelBuilder.Entity<Grade>(entity =>
        {
            entity.HasIndex(e => e.HomeworkId, "IX_Grades_lessonId");

            entity.Property(e => e.HomeworkId).HasColumnName("homeworkId");
            entity.Property(e => e.Mark).HasColumnName("mark");
            entity.Property(e => e.StudentId).HasColumnName("studentId");
            entity.Property(e => e.TeacherId).HasColumnName("teacherId");

            entity.HasOne(d => d.Homework).WithMany(p => p.Grades)
                .HasForeignKey(d => d.HomeworkId);
        });

        modelBuilder.Entity<Homework>(entity =>
        {
            entity.ToTable("Homework");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.File).HasColumnName("file");
            entity.Property(e => e.LessonId).HasColumnName("lessonId");
            entity.Property(e => e.StudentId).HasColumnName("studentId");
        });

        modelBuilder.Entity<Lesson>(entity =>
        {
            entity.HasIndex(e => e.CourseId, "IX_Lessons_courseId");

            entity.Property(e => e.CourseId).HasColumnName("courseId");
            entity.Property(e => e.ParentId).HasColumnName("parentId");
            entity.Property(e => e.Text).HasColumnName("text");
            entity.Property(e => e.Title).HasColumnName("title");

            entity.HasOne(d => d.Course).WithMany(p => p.Lessons)
                .HasForeignKey(d => d.CourseId);
        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CourseId).HasColumnName("courseId");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.Text).HasColumnName("text");
            entity.Property(e => e.UserId).HasColumnName("userId");

            entity.HasOne(d => d.Course).WithMany(p => p.Messages)
                .HasForeignKey(d => d.CourseId);
        });

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasOne(d => d.Course).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.CourseId);
        });

        modelBuilder.Entity<UsersCourse>(entity =>
        {
            entity.ToTable("Users_Courses");

            entity.HasIndex(e => e.CourseId, "IX_Users_Courses_courseId");

            entity.Property(e => e.CourseId).HasColumnName("courseId");
            entity.Property(e => e.UserId).HasColumnName("userId");

            entity.HasOne(d => d.Course).WithMany(p => p.UsersCourses)
                .HasForeignKey(d => d.CourseId);
        });

        modelBuilder.Entity<Video>(entity =>
        {
            entity.ToTable("Video");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Data).HasColumnName("data");
            entity.Property(e => e.LessonId).HasColumnName("lessonId");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
