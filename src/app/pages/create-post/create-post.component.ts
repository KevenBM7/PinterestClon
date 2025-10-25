import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  private fb = inject(FormBuilder);
  private postService = inject(PostService);
  private router = inject(Router);

  postForm: FormGroup;
  isSubmitting = false;
  submitMessage = '';

  constructor() {
    this.postForm = this.fb.group({
      title: [''],     // ← Sin validaciones requeridas
      description: [''], // ← Sin validaciones requeridas
      imageUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/i)]] // ← Solo este obligatorio
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      this.isSubmitting = true;
      this.submitMessage = '';

      const formValue = this.postForm.value;
      const newPost: Post = {
        imageUrl: formValue.imageUrl,
        createdAt: new Date()
      };

      // Solo agregar título y descripción si tienen contenido
      if (formValue.title?.trim()) {
        newPost.title = formValue.title.trim();
      }
      if (formValue.description?.trim()) {
        newPost.description = formValue.description.trim();
      }

      this.postService.createPost(newPost).subscribe({
        next: (response) => {
          this.submitMessage = '¡Pin creado exitosamente!';
          this.isSubmitting = false;
          this.postForm.reset();
          
          // Redirigir a home después de 2 segundos
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        },
        error: (error) => {
          console.error('Error creando post:', error);
          this.submitMessage = 'Error al crear el pin. Intenta de nuevo.';
          this.isSubmitting = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.postForm.controls).forEach(key => {
      this.postForm.get(key)?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.postForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
}