using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WebApi;

public partial class LearnMasterContext : DbContext
{

    public LearnMasterContext(DbContextOptions<LearnMasterContext> options)
        : base(options)
    {
        
    }

    public virtual DbSet<Course> Courses { get; set; }

    public virtual DbSet<Grade> Grades { get; set; }

    public virtual DbSet<Lesson> Lessons { get; set; }

    public virtual DbSet<UsersCourse> UsersCourses { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Course>(entity =>
        {
            entity.Property(e => e.Name).HasColumnName("name");
        });

        modelBuilder.Entity<Grade>(entity =>
        {
            entity.Property(e => e.Grade1).HasColumnName("grade");
            entity.Property(e => e.LessonId).HasColumnName("lessonId");
            entity.Property(e => e.StudentId).HasColumnName("studentId");
            entity.Property(e => e.TeacherId).HasColumnName("teacherId");

            entity.HasOne(d => d.Lesson).WithMany(p => p.Grades)
                .HasForeignKey(d => d.LessonId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<Lesson>(entity =>
        {
            entity.Property(e => e.CourseId).HasColumnName("courseId");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.ParentId).HasColumnName("parentId");

            entity.HasOne(d => d.Course).WithMany(p => p.Lessons)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<UsersCourse>(entity =>
        {
            entity.ToTable("Users_Courses");

            entity.Property(e => e.CourseId).HasColumnName("courseId");
            entity.Property(e => e.UserId).HasColumnName("userId");

            entity.HasOne(d => d.Course).WithMany(p => p.UsersCourses)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
