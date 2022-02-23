<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid" :class="{ 'bg-green-400 border-green-400 border-solid': isDragOver }" @drag.prevent.stop="" @dragstart.prevent.stop="" @dragend.prevent.stop="isDragOver = false" @dragover.prevent.stop="isDragOver = true" @dragenter.prevent.stop="isDragOver = true" @dragleave.prevent.stop="isDragOver = false" @drop.prevent.stop="upload">
        <h5>Drop your files here</h5>
      </div>
      <input type="file" multiple @change="upload($event)" />
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <div class="font-bold text-sm" :class="upload.textClass">
          <i :class="upload.icon"></i>
          {{ upload.name }}
        </div>
        <!-- Inner Progress Bar -->
        <div class="relative pt-1">
          <div class="overflow-hidden h-2 text-xs flex rounded" :class="upload.variant">
            <div :style="{ width: `${upload.currentProgress}%` }" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center" :class="upload.variant.replace(200, 500)"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage, auth, songsCollection } from '@/includes/firebase';

export default {
  name: 'Upload',
  props: {
    addSong: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      isDragOver: false,
      uploads: [],
    };
  },
  methods: {
    upload($event) {
      this.isDragOver = false;
      const files = $event.dataTransfer ? [...$event.dataTransfer.files] : [...$event.target.files];
      console.log(files);
      files.forEach((file) => {
        if (file.type !== 'audio/mpeg') {
          return;
        }
        if (!navigator.onLine) {
          this.uploads.push({
            task: {},
            currentProgress: 100,
            name: file.name,
            variant: 'bg-red-400',
            icon: 'fas fa-times',
            textClass: 'text-reed-400',
          });
          return;
        }
        const storageRef = storage.ref();
        const songsRef = storageRef.child(`songs/${file.name}`);
        const task = songsRef.put(file);
        const uploadIndex = this.uploads.push({
          task,
          currentProgress: 0,
          name: file.name,
          variant: 'bg-blue-200',
          icon: 'fas fa-spinner fa-spin',
          textClass: '',
        });
        task.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploads[uploadIndex - 1].currentProgress = progress;
          },
          (error) => {
            this.uploads[uploadIndex - 1].variant = 'bg-red-200';
            this.uploads[uploadIndex - 1].icon = 'fas fa-times';
            this.uploads[uploadIndex - 1].textClass = 'text-red-400';
            console.log(error);
          },
          async () => {
            const song = {
              uid: auth.currentUser.uid,
              displayName: auth.currentUser.displayName,
              originalName: task.snapshot.ref.name,
              modifiedName: task.snapshot.ref.name,
              genre: '',
              commentCount: 0,
            };
            song.url = await task.snapshot.ref.getDownloadURL();
            const songRef = await songsCollection.add(song);
            const songSnap = await songRef.get();
            this.addSong(songSnap);
            this.uploads[uploadIndex - 1].variant = 'bg-green-200';
            this.uploads[uploadIndex - 1].icon = 'fas fa-check';
            this.uploads[uploadIndex - 1].textClass = 'text-green-400';
          },
        );
      });
    },
  },
  beforeUnmount() {
    this.uploads.forEach((upload) => {
      upload.task.cancel();
    });
  },
};
</script>
