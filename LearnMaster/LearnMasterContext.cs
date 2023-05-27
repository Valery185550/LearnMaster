using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace LearnMaster;

public partial class LearnMasterContext : DbContext
{
    private string connectionStr;
    public LearnMasterContext(string connectionStr)
    {
        this.connectionStr = connectionStr;
    }

    /*public LearnMasterContext(DbContextOptions<LearnMasterContext> options)
        : base(options)
    {
    }*/



    public virtual DbSet<Course> Courses { get; set; }

    public virtual DbSet<Grade> Grades { get; set; }

    public virtual DbSet<Lesson> Lessons { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UsersCourse> UsersCourses { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlite(connectionStr);

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
            entity.Property(e => e.UserId).HasColumnName("userId");

            entity.HasOne(d => d.Lesson).WithMany(p => p.Grades)
                .HasForeignKey(d => d.LessonId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.User).WithMany(p => p.Grades)
                .HasForeignKey(d => d.UserId)
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

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(e => e.Password, "IX_Users_password").IsUnique();

            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.Password).HasColumnName("password");
            entity.Property(e => e.Role).HasColumnName("role");
        });

        modelBuilder.Entity<UsersCourse>(entity =>
        {
            entity.ToTable("Users_Courses");

            entity.Property(e => e.CourseId).HasColumnName("courseId");
            entity.Property(e => e.UserId).HasColumnName("userId");

            entity.HasOne(d => d.Course).WithMany(p => p.UsersCourses)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.User).WithMany(p => p.UsersCourses)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
